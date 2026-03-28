export const demoFarmers = [
  {
    farmerId: 1,
    name: 'Thabo Mokoena',
    language: 'Zulu',
    location: 'KwaZulu-Natal',
    contactNumber: '082 123 4567',
    literacyLevel: 'High',
  },
  {
    farmerId: 2,
    name: 'Lerato Dlamini',
    language: 'Sotho',
    location: 'Free State',
    contactNumber: '083 987 6543',
    literacyLevel: 'Medium',
  },
  {
    farmerId: 3,
    name: 'Sipho Ndlovu',
    language: 'Xhosa',
    location: 'Eastern Cape',
    contactNumber: '084 555 1234',
    literacyLevel: 'Low',
  },
];

export const demoFarms = [
  {
    farmId: 1,
    name: 'Green Valley',
    location: 'KwaZulu-Natal',
    size: '50 ha',
    farmerId: 1,
    crop: 'Maize',
  },
  {
    farmId: 2,
    name: 'Sunrise Farm',
    location: 'Free State',
    size: '30 ha',
    farmerId: 2,
    crop: 'Wheat',
  },
];

export const demoDashboard = {
  yield: '7.2 t/ha',
  profit: 'R120,000',
  risk: 'Low',
  alerts: ['Rain expected this week', 'Low pest risk'],
};

export const demoPredictions = [
  {
    type: 'Yield',
    value: '7.2 t/ha',
    confidence: 'High',
  },
  {
    type: 'Pest',
    value: 'Low',
    confidence: 'Medium',
  },
  {
    type: 'Market',
    value: 'Stable',
    confidence: 'High',
  },
];
