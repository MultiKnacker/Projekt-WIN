  // Create the users
  db.createUser({user: 'admin', pwd: 'admin', roles: [ { role: 'dbOwner', db: 'carrental' } ] });
  db.createUser({user: 'webserver', pwd: 'webserver', roles: [ { role: 'readWrite', db: 'carrental' } ] });  

  // Create the collections
  const collections = ['keydata', 'performance_report', 'central', 'employee', 'customer', 'rentalagreement', 'vehicle', 'vehicle_cost', 'vehicle_cost_types'];
  collections.forEach(collection => {
    db.createCollection(collection, function(err, res) {
      if (err) throw err;
      console.log(`Collection '${collection}' created!`);
    });
  });

  // Insert multiple documents into each collection
  const centrals = [
    { centralID: 1, name: 'Zentrale Hamburg', location: 'Flughafen', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', rent: 1000 },
    { centralID: 2, name: 'Zentrale Berlin', location: 'Bahnhof', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', rent: 1200 },
    // Add more central documents here...
  ];
  db.central.insertMany(centrals);

  const employees = [
    { employeeId: 1, lastname: 'Müller', firstname: 'Hans', job: 'Vertrieb', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', monthly_wage: 1500.00, centralID: 1 },
    { employeeId: 2, lastname: 'Grönemeyer', firstname: 'Herbert', job: 'Vertrieb', streetname: 'Herberstraße 21', region: 'Hamburg', zipcode: '20359', monthly_wage: 1500.00, centralID: 1 },
    { employeeId: 3, lastname: 'Schmidt', firstname: 'Peter', job: 'HR', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', monthly_wage: 2000.00, centralID: 2 },
    // Add more employee documents here...
  ];
  db.employee.insertMany(employees);

  const keydatas = [
    { quater: 1, revenue: 10000, oustanding_revenue: 5000, personal_costs: 2000, rent: 1000, year: 2024, centralID: 1 },
    { quater: 2, revenue: 15000, oustanding_revenue: 7000, personal_costs: 2500, rent: 1200, year: 2024, centralID: 2 },
    // Add more keydata documents here...
  ];
  db.keydata.insertMany(keydatas);

  const performance_reports = [
    { name: 'Q1 2024', date: new Date(), centralID: 1 },
    { name: 'Q2 2024', date: new Date(), centralID: 2 },
    // Add more performance_report documents here...
  ];
  db.performance_report.insertMany(performance_reports);

  const vehicles = [
    { numberplate: 'HH-AB-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 50, brand: 'Audi', model: 'A4', ensurance: 100, original_price: 30000, date_of_purchase: new Date(), centralID: 1 },
    { numberplate: 'B-CD-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 100, brand: 'Mercedes', model: 'Actros', ensurance: 200, original_price: 50000, date_of_purchase: new Date(), centralID: 2 },
    // Add more vehicle documents here...
  ];
  db.vehicle.insertMany(vehicles);

  const vehicle_costs = [
    { date: new Date(), costs: 500, typ: 'Reinigung', vehicle: 'HH-AB-123' },
    { date: new Date(), costs: 1000, typ: 'Reparatur', vehicle: 'B-CD-456' },
    // Add more vehicle_costs documents here...
  ];
  db.vehicle_costs.insertMany(vehicle_costs);

  const vehicle_cost_types = [
    { type: 'Reinigung'},
    { type: 'Reparatur'},
    // Add more vehicle_cost_types documents here...
  ];
  db.vehicle_cost_types.insertMany(vehicle_cost_types);

  const rentalagreements = [
    { orderNr: 'RA123', recieves: new Date(), returned: new Date(), discount: 10, vehicle: 'HH-AB-123', centralID: 1 },
    { orderNr: 'RA456', recieves: new Date(), returned: new Date(), discount: 15, vehicle: 'B-CD-456', centralID: 2 },
    // Add more rentalagreement documents here...
  ];
  db.rentalagreement.insertMany(rentalagreements);

  const customers = [
    { customerID: 1, lastname: 'Schmidt', firstname: 'Peter', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', company: '', rentalagreement: 'RA123' },
    { customerID: 2, lastname: 'Meyer', firstname: 'Anna', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', company: 'ABC GmbH', rentalagreement: 'RA456' },
    // Add more customer documents here...
  ];
  db.customer.insertMany(customers);
