import { useTournament } from '../hooks/useTournament'
import TeamSlot from './TeamSlot'
import cupImage from '../assets/cup.png'
import { GROUP1_TEAMS, GROUP2_TEAMS, GROUP3_TEAMS, GROUP4_TEAMS, TEAMS } from '../constants/teams'
import { useRef, useCallback } from 'react'

const TournamentBracket = () => {
  const {
    availableTeams,
    selectTeam,
    isSlotLocked,
    getSelectedTeam,
    getAllSelectedTeams,
    isAnyAnimating,
    setAnimating
  } = useTournament()

  const handleTeamSelect = (slotId, teamName) => {
    selectTeam(slotId, teamName)
  }

  // Har bir slot uchun mos jamoalarni qaytaradi
  // 
  // 8.1 guruh (group8) indexlar:
  //   Index 0,2,4,6: slot-group8-0/2/4/6 -> 1-guruh jamoalari (juft)
  //   Index 1,3,5,7: slot-group8-1/3/5/7 -> 3-guruh jamoalari (toq)
  //
  // 8.2 guruh (group8-rev) indexlar:
  //   Index 0,2,4,6: slot-group8-rev-0/2/4/6 -> 2-guruh jamoalari (juft)
  //   Index 1,3,5,7: slot-group8-rev-1/3/5/7 -> 4-guruh jamoalari (toq)
  // Animatsiyada ko'rsatiladigan jamoalar - barcha 16 jamoa
  const getAnimationTeamsForSlot = (slotId, groupKey, index) => {
    // Animatsiyada barcha 16 jamoa aylanadi (availableTeams ga qaramay)
    return TEAMS
  }

  // Har bir slot uchun qaysi guruhdan jamoa tanlash mumkinligini tekshiradi
  const getValidTeamsForSlot = (slotId, groupKey, index) => {
    // 8 talik guruhlar uchun
    if (slotId.startsWith('slot-group8-')) {
      if (groupKey === 'group8') {
        // 8.1 guruh
        if (index % 2 === 0) {
          // Juft raqamlar (0, 2, 4, 6) -> 1-guruh
          return GROUP1_TEAMS.filter(team => availableTeams.includes(team))
        } else {
          // Toq raqamlar (1, 3, 5, 7) -> 3-guruh
          return GROUP3_TEAMS.filter(team => availableTeams.includes(team))
        }
      } else if (groupKey === 'group8-rev') {
        // 8.2 guruh
        if (index % 2 === 0) {
          // Juft raqamlar (0, 2, 4, 6) -> 2-guruh
          return GROUP2_TEAMS.filter(team => availableTeams.includes(team))
        } else {
          // Toq raqamlar (1, 3, 5, 7) -> 4-guruh
          return GROUP4_TEAMS.filter(team => availableTeams.includes(team))
        }
      }
    }
    
    // Boshqa guruhlar uchun barcha mavjud jamoalar
    return availableTeams
  }


  // Create slot groups in order: 8-4-2-1-1-2-4-8 (changed: 8-2-1-1-2-8)
  const group8 = Array.from({ length: 8 }, (_, i) => `slot-group8-${i}`)
  const group4 = Array.from({ length: 2 }, (_, i) => `slot-group4-${i}`) // 4 talik -> 2 talik
  const group2 = Array.from({ length: 1 }, (_, i) => `slot-group2-${i}`) // 2 talik -> 1 talik

  const renderSlotGroup = (slots, groupKey, enableRoulette = false, gapClass = 'gap-3') => (
    <div key={groupKey} className={`flex flex-col items-center justify-center ${gapClass} w-full max-w-xs`}>
      {slots.map((slotId, index) => (
        <TeamSlot
          key={slotId}
          slotId={slotId}
          availableTeams={availableTeams}
          isLocked={isSlotLocked(slotId)}
          selectedTeam={getSelectedTeam(slotId)}
          onSelect={handleTeamSelect}
          isAnyAnimating={isAnyAnimating}
          setAnimating={setAnimating}
          enableRoulette={enableRoulette}
        />
      ))}
    </div>
  )

  // 8 talik guruh uchun alohida render - har 2 slotdan keyin katta masofa
  const renderGroup8 = (slots, groupKey, enableRoulette = false) => {
    const smallGap = 12 // Kichik gap (2x kamaytirildi: 24px -> 12px)
    const largeGap = 40 // Har 2 slotdan keyin katta masofa (2x kamaytirildi: 80px -> 40px)
    
    return (
      <div 
        key={groupKey} 
        className="flex flex-col items-center justify-center w-full max-w-xs"
      >
        {slots.map((slotId, index) => {
          // Har 2 slotdan keyin (index 2, 4, 6) katta masofa
          let marginTop = 0
          if (index === 0) {
            marginTop = 0
          } else if (index % 2 === 0 && index > 0) {
            // 2, 4, 6 slotlar - katta masofa
            marginTop = largeGap
          } else {
            // 1, 3, 5, 7 slotlar - kichik masofa
            marginTop = smallGap
          }
          
          return (
            <div 
              key={slotId} 
              className="w-full relative"
              style={{ marginTop: `${marginTop}px` }}
            >
              <TeamSlot
                slotId={slotId}
                availableTeams={getValidTeamsForSlot(slotId, groupKey, index)}
                animationTeams={getAnimationTeamsForSlot(slotId, groupKey, index)}
                validTeams={getValidTeamsForSlot(slotId, groupKey, index)}
                isLocked={isSlotLocked(slotId)}
                selectedTeam={getSelectedTeam(slotId)}
                onSelect={handleTeamSelect}
                isAnyAnimating={isAnyAnimating}
                setAnimating={setAnimating}
                enableRoulette={enableRoulette}
              />
              {/* O'ng tarafga 30px chiziq - tugmadan tashqariga - faqat 8 talik guruh 1 uchun */}
              {groupKey === 'group8' && (
                <div 
                  className="absolute top-1/2"
                  style={{
                    left: '100%',
                    width: '30px',
                    height: '2px',
                    background: 'rgba(168, 85, 247, 0.6)',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              {/* Chap tarafga 30px chiziq - tugmadan tashqariga - faqat 8 talik guruh 2 uchun */}
              {groupKey === 'group8-rev' && (
                <div 
                  className="absolute top-1/2"
                  style={{
                    right: '100%',
                    width: '30px',
                    height: '2px',
                    background: 'rgba(168, 85, 247, 0.6)',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
              {/* Juft slotlar orasiga vertikal birlashtiruvchi chiziq (1-2, 3-4, 5-6, 7-8) */}
              {/* Har bir 1-gorizontal chiziqdan (juft index 0,2,4,6) pastga vertikal chiziq */}
              {/* Koordinatalar:
                  Gorizontal chiziq: left/right = calc(100% + 30px), top = 50%
                  Vertikal chiziq: left/right = calc(100% + 30px), top = 50%, height = 92px (smallGap 12px + slot 80px)
                  Slot balandligi: 80px, smallGap: 12px, largeGap: 40px
              */}
              {index % 2 === 0 && (
                <>
                  {/* Vertikal chiziq - juft slotlarni birlashtiradi (1-2, 3-4, 5-6, 7-8) */}
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: 'calc(100% + 30px)',
                      top: '50%',
                      width: '2px',
                      height: `${smallGap + 80}px`, // 92px
                      background: 'rgba(168, 85, 247, 0.6)',
                    }}
                  />
                  {/* Vertikal chiziq markazidan gorizontal chiziq (150px) */}
                  {/* Vertikal chiziq: top=50%, height=92px, oxiri=50%+92px, markazi=50%+46px */}
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: `calc(100% + 30px + 2px)`, // Vertikal chiziqdan keyin
                      top: `calc(50% + ${(smallGap + 80) / 2}px)`, // Vertikal chiziq markazi
                      width: '150px',
                      height: '2px',
                      background: 'rgba(168, 85, 247, 0.6)',
                      transform: `translateY(-50%)`,
                    }}
                  />
                </>
              )}
              {/* 1-2 va 3-4 juft slotlar uchun gorizontal chiziqlardan vertikal birlashtiruvchi chiziq */}
              {index === 0 && (
                <>
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: `calc(100% + 30px + 2px + 150px)`, // Gorizontal chiziq oxiridan
                      top: `calc(50% + ${(smallGap + 80) / 2}px)`, // Birinchi vertikal chiziq - gorizontal chiziq markazidan (yuqorida)
                      width: '2px',
                      height: `212px`, // Vertikal chiziq uzunligi 212px
                      background: 'rgba(168, 85, 247, 0.6)',
                    }}
                  />
                  {/* Birinchi vertikal chiziq markazidan gorizontal chiziq */}
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: `calc(100% + 30px + 2px + 150px + 2px)`, // Vertikal chiziqdan keyin
                      top: `calc(50% + ${(smallGap + 80) / 2}px + 106px)`, // Vertikal chiziq markazi (212px / 2 = 106px)
                      width: '150px', // Gorizontal chiziq uzunligi 150px
                      height: '2px',
                      background: 'rgba(168, 85, 247, 0.6)',
                      transform: `translateY(-50%)`,
                    }}
                  />
                  {/* 1-2 va 3-4 juft slotlar gorizontal chiziqlarini birlashtiruvchi bitta uzun vertikal chiziq */}
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: `calc(100% + 30px + 2px + 150px + 2px + 150px)`, // Gorizontal chiziq oxiridan
                      top: `calc(50% + ${(smallGap + 80) / 2}px + 106px)`, // Birinchi gorizontal chiziq markazidan
                      width: '2px',
                      height: `${(smallGap + 80) * 2.2 + 10 + (smallGap + 80) + 121}px`, // 1-2 va 3-4 gorizontal chiziqlar orasidagi masofa + qo'shimcha 121px uzunlik
                      background: 'rgba(168, 85, 247, 0.6)',
                    }}
                  />
                  {/* Uzun vertikal chiziq markazidan gorizontal chiziq */}
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: `calc(100% + 30px + 2px + 150px + 2px + 150px + 2px)`, // Vertikal chiziqdan keyin
                      top: `calc(50% + ${(smallGap + 80) / 2}px + 106px + ${((smallGap + 80) * 2.2 + 10 + (smallGap + 80) + 121) / 2}px)`, // Vertikal chiziq markazi
                      width: '200px', // Gorizontal chiziq uzunligi 200px
                      height: '2px',
                      background: 'rgba(168, 85, 247, 0.6)',
                      transform: `translateY(-50%)`,
                    }}
                  />
                </>
              )}
              {index === 2 && (
                <>
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: `calc(100% + 30px + 2px + 150px)`, // Gorizontal chiziq oxiridan
                      top: `calc(50% + ${(smallGap + 80) / 2}px + ${(smallGap + 80) * 2.2}px + 10px)`, // Ikkinchi vertikal chiziq - gorizontal chiziq markazidan 2.2 marta pastga + 10px
                      width: '2px',
                      height: `212px`, // Vertikal chiziq uzunligi 212px
                      background: 'rgba(168, 85, 247, 0.6)',
                    }}
                  />
                  {/* Ikkinchi vertikal chiziq markazidan gorizontal chiziq */}
                  <div 
                    className="absolute"
                    style={{
                      [groupKey === 'group8' ? 'left' : 'right']: `calc(100% + 30px + 2px + 150px + 2px)`, // Vertikal chiziqdan keyin
                      top: `calc(50% + ${(smallGap + 80) / 2}px + ${(smallGap + 80) * 2.2}px + 10px + 106px)`, // Vertikal chiziq markazi (212px / 2 = 106px)
                      width: '150px', // Gorizontal chiziq uzunligi 150px
                      height: '2px',
                      background: 'rgba(168, 85, 247, 0.6)',
                      transform: `translateY(-50%)`,
                    }}
                  />
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // 4 talik guruh uchun alohida render - barcha oraliqlar bir xil, yuqori/pastki padding gap/2
  // Endi 2 talik guruh - "Chorak final" tekstli, yashil-sariq gradient
  const renderGroup4 = (slots, groupKey, enableRoulette = false) => {
    const gap = 350 // Slotlar orasidagi gap (350px)
    const gapHalf = gap / 2 // Yuqori va pastki padding uchun (gap/2 = 175px)
    // 8 talik guruh balandligi: 8 slot (80px har biri) + 7 gap (12px har biri) ≈ 724px
    // 4 talik guruh 8 talik guruhdan oshmasligi uchun max-height
    const maxHeight = 750 // 8 talik guruhdan oshmasligi uchun maksimal balandlik
    const greenYellowGradient = 'linear-gradient(to bottom, rgba(34, 197, 94, 0.9), rgba(250, 204, 21, 0.9))'
    
    return (
      <div 
        key={groupKey} 
        className="flex flex-col items-center justify-center w-full max-w-[200px]"
        style={{
          paddingTop: `${gapHalf}px`,
          paddingBottom: `${gapHalf}px`,
          maxHeight: `${maxHeight}px`,
          height: '100%',
          position: 'relative',
          zIndex: 10, // Liniyalardan yuqoriga olib o'tish
        }}
      >
        {slots.map((slotId, index) => (
          <div 
            key={slotId} 
            className="w-full"
            style={{
              marginTop: index === 0 ? 0 : `${gap}px` // Barcha oraliqlar bir xil
            }}
          >
            <TeamSlot
              slotId={slotId}
              availableTeams={availableTeams}
              isLocked={isSlotLocked(slotId)}
              selectedTeam={getSelectedTeam(slotId)}
              onSelect={handleTeamSelect}
              isAnyAnimating={isAnyAnimating}
              setAnimating={setAnimating}
              enableRoulette={enableRoulette}
              customText={!getSelectedTeam(slotId) ? 'Chorak final' : null}
              customGradient={greenYellowGradient}
            />
          </div>
        ))}
      </div>
    )
  }

  // 2 talik guruh uchun alohida render - barcha oraliqlar bir xil, yuqori/pastki padding gap bilan bir xil
  const renderGroup2 = (slots, groupKey, enableRoulette = false) => {
    const gap = 840 // Barcha oraliqlar bir xil (280px * 3 = 840px)
    // Yuqori va pastki padding gap bilan bir xil (gap/2 emas)
    // 8 talik guruh balandligi: 8 slot (80px har biri) + 7 gap (12px har biri) ≈ 724px
    // 2 talik guruh 8 talik guruhdan oshmasligi uchun max-height
    const maxHeight = 750 // 8 talik guruhdan oshmasligi uchun maksimal balandlik
    
    return (
      <div 
        key={groupKey} 
        className="flex flex-col items-center justify-center w-full max-w-[200px]"
        style={{
          paddingTop: `${gap}px`, // Yuqori padding gap bilan bir xil
          paddingBottom: `${gap}px`, // Pastki padding gap bilan bir xil
          maxHeight: `${maxHeight}px`,
          height: '100%',
        }}
      >
        {slots.map((slotId, index) => (
          <div 
            key={slotId} 
            className="w-full"
            style={{
              marginTop: index === 0 ? 0 : `${gap}px` // Barcha oraliqlar bir xil
            }}
          >
            <TeamSlot
              slotId={slotId}
              availableTeams={availableTeams}
              isLocked={isSlotLocked(slotId)}
              selectedTeam={getSelectedTeam(slotId)}
              onSelect={handleTeamSelect}
              isAnyAnimating={isAnyAnimating}
              setAnimating={setAnimating}
              enableRoulette={enableRoulette}
            />
          </div>
        ))}
      </div>
    )
  }

  // 1 talik guruh uchun alohida render - chapdagisini chapga, o'ngdagisini o'ngga surish
  // "Yarim final" tekstli, yashil-sariq gradient
  const renderGroup1 = (slots, groupKey, enableRoulette = false, alignLeft = false) => {
    const gap = 840 // Yuqori va pastki padding
    const maxHeight = 750 // 8 talik guruhdan oshmasligi uchun maksimal balandlik
    const greenYellowGradient = 'linear-gradient(to bottom, rgba(34, 197, 94, 0.9), rgba(250, 204, 21, 0.9))'
    
    return (
      <div 
        key={groupKey} 
        className="flex flex-col items-center justify-center w-full max-w-[200px]"
        style={{
          paddingTop: `${gap}px`,
          paddingBottom: `${gap}px`,
          maxHeight: `${maxHeight}px`,
          height: '100%',
          marginLeft: alignLeft ? '-50px' : 'auto', // Chapdagisini cup ga yaqinlashtirish
          marginRight: !alignLeft ? '-50px' : 'auto', // O'ngdagisini cup ga yaqinlashtirish
          position: 'relative',
          zIndex: 10, // Liniyalardan yuqoriga olib o'tish
        }}
      >
        {slots.map((slotId, index) => (
          <TeamSlot
            key={slotId}
            slotId={slotId}
            availableTeams={availableTeams}
            isLocked={isSlotLocked(slotId)}
            selectedTeam={getSelectedTeam(slotId)}
            onSelect={handleTeamSelect}
            isAnyAnimating={isAnyAnimating}
            setAnimating={setAnimating}
            enableRoulette={enableRoulette}
            customText={!getSelectedTeam(slotId) ? 'Yarim final' : null}
            customGradient={greenYellowGradient}
          />
        ))}
      </div>
    )
  }

  // Barcha 16 jamoa tanlangandan keyin tekshirish
  const allTeamsSelected = availableTeams.length === 0

  // PDF export funksiyasi
  const handleExportToPDF = useCallback(async () => {
    if (!allTeamsSelected) return

    try {
      // Dynamic import for html2pdf.js
      const html2pdf = (await import('html2pdf.js')).default

      // PDF export uchun container element
      const bracketContainer = bracketRef.current || document.querySelector('.bracket-container') || document.body
      
      // PDF export sozlamalari
      const opt = {
        margin: 0.5,
        filename: 'tournament-bracket.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
      }

      // PDF export
      html2pdf().set(opt).from(bracketContainer).save()
    } catch (error) {
      console.error('PDF export xatosi:', error)
      alert('PDF yuklab olishda xatolik yuz berdi')
    }
  }, [allTeamsSelected])

  const bracketRef = useRef(null)

  return (
    <div ref={bracketRef} className="bracket-container h-screen w-screen flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Header - Center Top */}
      <div className="absolute top-0 left-0 right-0 text-center pt-4 pb-4 z-10">
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2"
          style={{
            background: 'linear-gradient(to right, rgb(34, 197, 94), rgb(250, 204, 21), rgb(34, 197, 94))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          NAMFOOTBALL
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-white uppercase">
          HAVASKOR FUTBOLL LIGASI
        </p>
      </div>

      {/* Main container - groups in order: 8-2-1-1-2-8 (1 talik guruhlar o'chirildi, 4->2, 2->1) */}
      <div className="flex flex-row items-center justify-center w-full flex-1 px-0 gap-6 pt-24 md:pt-32">
        {/* 8 talik guruh - har 2 slotdan keyin masofa */}
        {renderGroup8(group8, 'group8', true)}
        
        {/* 4 talik guruh -> 2 talik - birinchi gap maksimal, balandlik 8 talik guruhdan oshmasligi kerak */}
        <div style={{ marginLeft: '60px' }}>
          {renderGroup4(group4, 'group4', false)}
        </div>
        
        {/* 2 talik guruh -> 1 talik - chapga surilgan */}
        {renderGroup1(group2, 'group2', false, true)}
        
        {/* Cup o'rtada - barcha 16 jamoa tanlangandan keyin bosiladi */}
        <div 
          className="flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-300"
          style={{ 
            pointerEvents: allTeamsSelected ? 'auto' : 'none',
            userSelect: 'none',
            opacity: 1,
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))'
          }}
          onClick={handleExportToPDF}
        >
          <img 
            src={cupImage} 
            alt="Cup" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain transition-transform duration-300 hover:scale-110" 
            style={{ pointerEvents: 'none', userSelect: 'none' }} 
          />
        </div>
        
        {/* 2 talik guruh (reverse) -> 1 talik - o'ngga surilgan */}
        {renderGroup1(Array.from({ length: 1 }, (_, i) => `slot-group2-rev-${i}`), 'group2-rev', false, false)}
        
        {/* 4 talik guruh (reverse) -> 2 talik - birinchi gap maksimal, balandlik 8 talik guruhdan oshmasligi kerak */}
        <div style={{ marginRight: '60px' }}>
          {renderGroup4(Array.from({ length: 2 }, (_, i) => `slot-group4-rev-${i}`), 'group4-rev', false)}
        </div>
        
        {/* 8 talik guruh (reverse) - har 2 slotdan keyin masofa */}
        {renderGroup8(Array.from({ length: 8 }, (_, i) => `slot-group8-rev-${i}`), 'group8-rev', true)}
      </div>

      {/* Info footer */}
      <div className="text-center text-purple-300 text-sm mt-4">
        <p>Teams: {availableTeams.length} / 16</p>
      </div>
    </div>
  )
}

export default TournamentBracket
