import * as XLSX from 'xlsx'

export const exportToExcel = (selectedTeams) => {
  const workbook = XLSX.utils.book_new()
  
  // Create data array
  const bracketData = []
  
  // Add header
  bracketData.push(['Tournament Draw Generator - Results'])
  bracketData.push([])
  bracketData.push(['Generated:', new Date().toLocaleString()])
  bracketData.push([])
  
  // Team slots
  bracketData.push(['Selected Teams'])
  bracketData.push(['Slot', 'Team Name'])
  
  // Export all 8 slots
  for (let i = 0; i < 8; i++) {
    const slotId = `slot-${i}`
    const teamName = selectedTeams[slotId] || 'TBD'
    bracketData.push([`Slot ${i + 1}`, teamName])
  }
  
  // Create worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(bracketData)
  
  // Set column widths
  worksheet['!cols'] = [
    { wch: 15 }, // Slot
    { wch: 30 }  // Team Name
  ]
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tournament Results')
  
  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const filename = `tournament-draw-${timestamp}.xlsx`
  
  // Write and download
  XLSX.writeFile(workbook, filename)
}
