/**Definirane lastnosti materialov */
export const materials = {
  iron: {
    name: 'Železo',
    temperature: 27,
    energy: 12123,
    capacity: 449, //Unit: J/(KgK)
    side: 0.05031,
    volume: 0.00012,
    area: 0.0126554805,
    density: 7850,
    talisce: 1538,
    vrelisce: 2861,
  },

  gold: {
    name: 'Zlato',
    temperature: 27,
    energy: null,
    capacity: 129,
    side: 0.03726,
    volume: 0.00005,
    area: 0.006941538,
    density: 19320,
    talisce: 1063,
    vrelisce: 2966,
  },

  steel: {
    name: 'Jeklo',
    temperature: 27,
    energy: null,
    capacity: 490, //Unit: J/(KgK)
    side: 0.0502,
    volume: 0.00012,
    area: 0.0126002,
    density: 7900,
    talisce: 1485,
    vrelisce: 2900,
  },

  water: {
    name: 'Voda',
    temperature: 27,
    energy: null,
    capacity: 4200,
    side: 0.1, //m
    volume: 0.001,
    area: 0.05,
    density: 1000, //Unit: kg/m^3
    talisce: 0,
    vrelisce: 100,
  },

  aluminum: {
    name: 'Aluminij',
    temperature: 27,
    energy: null,
    capacity: 903,
    side: 0.07172, //m
    volume: 0.00036,
    area: 0.025718792,
    density: 2710, //Unit: kg/m^3
    talisce: 660,
    vrelisce: 2470,
  },

  copper: {
    name: 'Baker',
    temperature: 27,
    energy: null,
    capacity: 377,
    side: 0.04834, //m
    volume: 0.00011,
    area: 0.011683778,
    density: 8850, //Unit: kg/m^3
    talisce: 660,
    vrelisce: 2470,
  },

  ethanol: {
    name: 'Etanol',
    temperature: 27,
    energy: null,
    capacity: 2570,
    side: 0.10822, //m
    volume: 0.00126,
    area: 0.058557842,
    density: 789, //Unit: kg/m^3
    talisce: -114,
    vrelisce: 78,
  },
};
