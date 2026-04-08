// Jamoalar 4 ta guruhga bo'lingan
export const GROUP1_TEAMS = [
  "Usta Tom Markazi",
  "Nam Lider",
  "Partsezd",
  "Mubashshir Avto"
];

export const GROUP2_TEAMS = [
  "Rayxon Cafe",
  "Hoji Ota Mebellari",
  "FC Kosonsoy",
  "Marjon Iplari"
];

export const GROUP3_TEAMS = [
  "FC Elegant",
  "Zarbdor City",
  "Al Bilal Mebel",
  "Bozorcha city"
];

export const GROUP4_TEAMS = [
  "Al-Mashriq",
  "FC Umid",
  "Rayxon Savdo",
  "FC G'uncha"
];

// Barcha jamoalar
export const TEAMS = [
  ...GROUP1_TEAMS,
  ...GROUP2_TEAMS,
  ...GROUP3_TEAMS,
  ...GROUP4_TEAMS
];

// Rigged matchups map: slotId -> TeamName
export const RIGGED_MATCHUPS = {
  // Left Side
  'slot-group8-0': 'Usta Tom Markazi',
  'slot-group8-1': 'FC Elegant',
  'slot-group8-2': 'Nam Lider',
  'slot-group8-3': 'Zarbdor City',
  'slot-group8-4': 'Partsezd',
  'slot-group8-5': 'Al Bilal Mebel',
  'slot-group8-6': 'Mubashshir Avto',
  'slot-group8-7': 'Bozorcha city',

  // Right Side
  'slot-group8-rev-0': 'Rayxon Cafe',
  'slot-group8-rev-1': 'Al-Mashriq',
  'slot-group8-rev-2': 'Hoji Ota Mebellari',
  'slot-group8-rev-3': 'FC Umid',
  'slot-group8-rev-4': 'FC Kosonsoy',
  'slot-group8-rev-5': 'Rayxon Savdo',
  'slot-group8-rev-6': 'Marjon Iplari',
  'slot-group8-rev-7': "FC G'uncha"
};
