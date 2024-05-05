db.createUser({
    user: 'webserver',
    pwd: 'webserver',
    roles: [
      {
        role: 'readWrite',
        db: 'carrental',
      },
    ],
  });

  db.central.insertMany([
    {
        _id: ObjectId("612a12545c368a067abc1234"), // Manuell zugewiesene ObjectId
        name: 'Zentrale 1',
        location: 'Flughafen',
        streetname: 'Flughafenstraße 120',
        region: 'Düsseldorf',
        zipcode: '40474'
    },
    {
        _id: ObjectId("612a12545c368a067abc1235"), // Manuell zugewiesene ObjectId
        name: 'Zentrale 2',
        location: 'Bahnhof',
        streetname: 'Bahnhofplatz 1',
        region: 'München',
        zipcode: '80335'
    },
    {
        _id: ObjectId("612a12545c368a067abc1236"), // Manuell zugewiesene ObjectId
        name: 'Zentrale 3',
        location: 'Innenstadt',
        streetname: 'Jungfernstieg 1',
        region: 'Hamburg',
        zipcode: '20095'
    },
    {
        _id: ObjectId("612a12545c368a067abc1237"), // Manuell zugewiesene ObjectId
        name: 'Zentrale 4',
        location: 'Flughafen',
        streetname: 'Hugo-Eckener-Ring 1',
        region: 'Frankfurt am Main',
        zipcode: '60549'
    },
    {
        _id: ObjectId("612a12545c368a067abc1238"), // Manuell zugewiesene ObjectId
        name: 'Zentrale 5',
        location: 'Bahnhof',
        streetname: 'Willy-Brandt-Platz 1',
        region: 'Leipzig',
        zipcode: '04109'
    }
]);

db.vehicles.insertMany( [
    {
        // Zentrale 1
        brand: "Mercedes",
        model: "Polo",
        type: "PKW",
        fueltype: "Benzin",
        dailyrate: "108.55",
        centralId: "612a12545c368a067abc1234",
        },
        {
        brand: "Mercedes",
        model: "3er",
        type: "PKW",
        fueltype: "LPG",
        dailyrate: "121.87",
        centralId: "612a12545c368a067abc1234",
        },
        {
        brand: "Mercedes",
        model: "C-Klasse",
        type: "LKW",
        fueltype: "LPG",
        dailyrate: "190.29",
        centralId: "612a12545c368a067abc1234",
        },
        {
        brand: "Mercedes",
        model: "Golf",
        type: "PKW",
        fueltype: "Benzin",
        dailyrate: "273.86",
        centralId: "612a12545c368a067abc1234",
        },
        {
        brand: "Mercedes",
        model: "3er",
        type: "PKW",
        fueltype: "Wasserstoff",
        dailyrate: "270.47",
        centralId: "612a12545c368a067abc1234",
        },
        // Zentrale 2
        {
        brand: "Mercedes",
        model: "Audi A4",
        type: "LKW",
        fueltype: "Benzin",
        dailyrate: "295.42",
        centralId: "612a12545c368a067abc1235",
        },
        {
        brand: "Mercedes",
        model: "3er",
        type: "PKW",
        fueltype: "Benzin",
        dailyrate: "63.05",
        centralId: "612a12545c368a067abc1235",
        },
        {
        brand: "Mercedes",
        model: "Golf",
        type: "LKW",
        fueltype: "Elektrisch",
        dailyrate: "60.25",
        centralId: "612a12545c368a067abc1235",
        },
        {
        brand: "Mercedes",
        model: "Polo",
        type: "PKW",
        fueltype: "LPG",
        dailyrate: "137.67",
        centralId: "612a12545c368a067abc1235",
        },
        {
        brand: "Mercedes",
        model: "Polo",
        type: "Transporter",
        fueltype: "Diesel",
        dailyrate: "228.16",
        centralId: "612a12545c368a067abc1235",
        },
        // Zentrale 3
        {
        brand: "Mercedes",
        model: "Golf",
        type: "Transporter",
        fueltype: "LPG",
        dailyrate: "70.45",
        centralId: "612a12545c368a067abc1236",
        },
        {
        brand: "Mercedes",
        model: "3er",
        type: "Transporter",
        fueltype: "Elektrisch",
        dailyrate: "116.01",
        centralId: "612a12545c368a067abc1236",
        },
        {
        brand: "Mercedes",
        model: "Polo",
        type: "LKW",
        fueltype: "Diesel",
        dailyrate: "228.97",
        centralId: "612a12545c368a067abc1236",
        },
        {
        brand: "Mercedes",
        model: "Polo",
        type: "Transporter",
        fueltype: "Wasserstoff",
        dailyrate: "266.42",
        centralId: "612a12545c368a067abc1236",
        },
        {
        brand: "Mercedes",
        model: "3er",
        type: "LKW",
        fueltype: "LPG",
        dailyrate: "290.25",
        centralId: "612a12545c368a067abc1236",
        },
        //Zentrale 4
        {
        brand: "Mercedes",
        model: "C-Klasse",
        type: "Transporter",
        fueltype: "Diesel",
        dailyrate: "106.47",
        centralId: "612a12545c368a067abc1237",
        },
        {
        brand: "Mercedes",
        model: "Polo",
        type: "PKW",
        fueltype: "Elektrisch",
        dailyrate: "109.23",
        centralId: "612a12545c368a067abc1237",
        },
        {
        brand: "Mercedes",
        model: "Audi A4",
        type: "LKW",
        fueltype: "LPG",
        dailyrate: "108.14",
        centralId: "612a12545c368a067abc1237",
        },
        {
        brand: "Mercedes",
        model: "Audi A4",
        type: "Transporter",
        fueltype: "Elektrisch",
        dailyrate: "190.83",
        centralId: "612a12545c368a067abc1237",
        },
        {
        brand: "Mercedes",
        model: "Q5",
        type: "LKW",
        fueltype: "Elektrisch",
        dailyrate: "229.48",
        centralId: "612a12545c368a067abc1237",
        },
        // Zentrale 5
        {
        brand: "Mercedes",
        model: "Audi A4",
        type: "PKW",
        fueltype: "Elektrisch",
        dailyrate: "99.45",
        centralId: "612a12545c368a067abc1238",
        },
        {
        brand: "Mercedes",
        model: "Audi A4",
        type: "Transporter",
        fueltype: "Wasserstoff",
        dailyrate: "245.42",
        centralId: "612a12545c368a067abc1238",
        },
        {
        brand: "Mercedes",
        model: "A-Klasse",
        type: "LKW",
        fueltype: "Wasserstoff",
        dailyrate: "101.59",
        centralId: "612a12545c368a067abc1238",
        },
        {
        brand: "Mercedes",
        model: "A-Klasse",
        type: "PKW",
        fueltype: "LPG",
        dailyrate: "179.99",
        centralId: "612a12545c368a067abc1238",
        },
        {
        brand: "Mercedes",
        model: "Passat",
        type: "LKW",
        fueltype: "Elektrisch",
        dailyrate: "157.08",
        centralId: "612a12545c368a067abc1238",
        },
])