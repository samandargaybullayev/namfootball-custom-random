// Chempionlar Ligasi guruhlari va jamoalari
export const CL_GROUPS = [
  { id: 1, p1: "Mubashshir Avto", p2: "Yandama Do'stlik" },
  { id: 2, p1: "Sanjar Chef", p2: "Parfume 170" },
  { id: 3, p1: "No Mercy", p2: "Do'stlik" },
  { id: 4, p1: "Marjon Iplari", p2: "Al-Rizo Mebel" },
  { id: 5, p1: "Mister M", p2: "Cosmos" },
  { id: 6, p1: "Chintech", p2: "Usta Pro Max" },
  { id: 7, p1: "Dominant", p2: "AT Truck" },
  { id: 8, p1: "Bozorça", p2: "Darko Plus" },
]

// Yevropa Ligasi guruhlari va jamoalari
export const EL_GROUPS = [
  { id: 1, p1: "Arsenal", p2: "Red Bull" },
  { id: 2, p1: "Saad Paint", p2: "Jahon Qurilish Buildings" },
  { id: 3, p1: "2-Maktab", p2: "Alpha Team" },
  { id: 4, p1: "Usta Akaxon", p2: "Win Plast" },
  { id: 5, p1: "Manchester United", p2: "Berlak" },
  { id: 6, p1: "Rovuston", p2: "Sevimli Lavash" },
  { id: 7, p1: "Aka-Uka Quruvchi", p2: "Uzinc FC" },
  { id: 8, p1: "7Saber", p2: "Zafar 17" },
]

export const LEAGUES = {
  cl: {
    id: 'cl',
    name: "Chempionlar Ligasi",
    shortName: "CHL",
    subtitle: "1-o'rin vs 2-o'rin jamoalari",
    p1Label: "1-o'rin",
    p2Label: "2-o'rin",
    groups: CL_GROUPS,
    teams: CL_GROUPS.flatMap(g => [g.p1, g.p2]),
    riggedMatchups: {
      // Left Side
      'slot-group8-0': 'Mubashshir Avto',
      'slot-group8-1': 'Cosmos',
      'slot-group8-2': 'Sanjar Chef',
      'slot-group8-3': 'Usta Pro Max',
      'slot-group8-4': 'No Mercy',
      'slot-group8-5': 'AT Truck',
      'slot-group8-6': 'Marjon Iplari',
      'slot-group8-7': 'Darko Plus',

      // Right Side
      'slot-group8-rev-0': 'Mister M',
      'slot-group8-rev-1': "Yandama Do'stlik",
      'slot-group8-rev-2': 'Chintech',
      'slot-group8-rev-3': 'Parfume 170',
      'slot-group8-rev-4': 'Dominant',
      'slot-group8-rev-5': "Do'stlik",
      'slot-group8-rev-6': 'Bozorça',
      'slot-group8-rev-7': 'Al-Rizo Mebel',
    }
  },
  el: {
    id: 'el',
    name: "Yevropa Ligasi",
    shortName: "YL",
    subtitle: "3-o'rin vs 4-o'rin jamoalari",
    p1Label: "3-o'rin",
    p2Label: "4-o'rin",
    groups: EL_GROUPS,
    teams: EL_GROUPS.flatMap(g => [g.p1, g.p2]),
    riggedMatchups: {
      // Left Side
      'slot-group8-0': 'Arsenal',
      'slot-group8-1': 'Berlak',
      'slot-group8-2': 'Saad Paint',
      'slot-group8-3': 'Sevimli Lavash',
      'slot-group8-4': '2-Maktab',
      'slot-group8-5': 'Uzinc FC',
      'slot-group8-6': 'Usta Akaxon',
      'slot-group8-7': 'Zafar 17',

      // Right Side
      'slot-group8-rev-0': 'Manchester United',
      'slot-group8-rev-1': 'Red Bull',
      'slot-group8-rev-2': 'Rovuston',
      'slot-group8-rev-3': 'Jahon Qurilish Buildings',
      'slot-group8-rev-4': 'Aka-Uka Quruvchi',
      'slot-group8-rev-5': 'Alpha Team',
      'slot-group8-rev-6': '7Saber',
      'slot-group8-rev-7': 'Win Plast',
    }
  }
}

// Backwards compatibility export
export const TEAMS = LEAGUES.cl.teams
export const RIGGED_MATCHUPS = LEAGUES.cl.riggedMatchups

