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
  const employees = [
    { _id: 1, lastname: 'Müller', firstname: 'Hans', job: 'Vertrieb', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', monthly_wage: 1500.00 },
    { _id: 2, lastname: 'Schmidt', firstname: 'Peter', job: 'HR', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', monthly_wage: 2000.00 },
    { _id: 3, lastname: 'Fischer', firstname: 'Robert', job: 'Kundenservice', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1700.00 },
    { _id: 4, lastname: 'Schulz', firstname: 'Markus', job: 'Zentralleiter', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 5000.00 },
    { _id: 5, lastname: 'Peters', firstname: 'Robert', job: 'Fahrzeugwartung', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2800.00 },
    { _id: 6, lastname: 'Berger', firstname: 'Andreas', job: 'Gutachter', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2900.00 },
    { _id: 7, lastname: 'Schneider', firstname: 'Johannes', job: 'Vertrieb', streetname: 'Alexanderplatz 1', region: 'Berlin', zipcode: '10178', monthly_wage: 1500.00 },
    { _id: 8, lastname: 'Fischer', firstname: 'Robert', job: 'HR', streetname: 'Unter den Linden 77', region: 'Berlin', zipcode: '10117', monthly_wage: 2000.00 },
    { _id: 9, lastname: 'Weber', firstname: 'Michael', job: 'Kundenservice', streetname: 'Friedrichstraße 43', region: 'Berlin', zipcode: '10969', monthly_wage: 1700.00 },
    { _id: 10, lastname: 'Meyer', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Potsdamer Platz 1', region: 'Berlin', zipcode: '10785', monthly_wage: 5000.00 },
    { _id: 11, lastname: 'Wagner', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Kurfürstendamm 237', region: 'Berlin', zipcode: '10719', monthly_wage: 2800.00 },
    { _id: 12, lastname: 'Becker', firstname: 'Martin', job: 'Gutachter', streetname: 'Tauentzienstraße 9', region: 'Berlin', zipcode: '10789', monthly_wage: 2900.00 },
    { _id: 13, lastname: 'Bauer', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 1500.00 },
    { _id: 14, lastname: 'König', firstname: 'Robert', job: 'HR', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2000.00 },
    { _id: 15, lastname: 'Schmitt', firstname: 'Michael', job: 'Kundenservice', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 1700.00 },
    { _id: 16, lastname: 'Meyer', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 5000.00 },
    { _id: 17, lastname: 'Jung', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2800.00 },
    { _id: 18, lastname: 'Hahn', firstname: 'Martin', job: 'Gutachter', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2900.00 },
    { _id: 19, lastname: 'Schmidt', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1500.00 },
    { _id: 20, lastname: 'Krause', firstname: 'Robert', job: 'HR', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2000.00 },
    { _id: 21, lastname: 'Werner', firstname: 'Michael', job: 'Kundenservice', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1700.00 },
    { _id: 22, lastname: 'Schulz', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 5000.00 },
    { _id: 23, lastname: 'Maier', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2800.00 },
    { _id: 24, lastname: 'Lehmann', firstname: 'Martin', job: 'Gutachter', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2900.00 },
    { _id: 25, lastname: 'Köhler', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 1500.00 },
    { _id: 26, lastname: 'Herrmann', firstname: 'Robert', job: 'HR', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2000.00 },
    { _id: 27, lastname: 'Kaiser', firstname: 'Michael', job: 'Kundenservice', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 1700.00 },
    { _id: 28, lastname: 'Möller', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 5000.00 },
    { _id: 29, lastname: 'Weiss', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2800.00 },
    { _id: 30, lastname: 'Hahn', firstname: 'Martin', job: 'Gutachter', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2900.00 },
    { _id: 31, lastname: 'Baumann', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 1500.00 },
    { _id: 32, lastname: 'Schumacher', firstname: 'Robert', job: 'HR', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2000.00 },
    { _id: 33, lastname: 'Blum', firstname: 'Michael', job: 'Kundenservice', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 1700.00 },
    { _id: 34, lastname: 'Winkler', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 5000.00 },
    { _id: 35, lastname: 'Beck', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2800.00 },
    { _id: 36, lastname: 'Roth', firstname: 'Martin', job: 'Gutachter', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2900.00 },
    { _id: 37, lastname: 'Arnold', firstname: 'Martin', job: 'Vertrieb', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 1500.00 },
    { _id: 38, lastname: 'Becker', firstname: 'Christian', job: 'HR', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 2000.00 },
    { _id: 39, lastname: 'Kuhn', firstname: 'Daniel', job: 'Kundenservice', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 1700.00 },
    { _id: 40, lastname: 'Keller', firstname: 'Johannes', job: 'Zentralleiter', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 5000.00 },
    { _id: 41, lastname: 'Günther', firstname: 'Markus', job: 'Fahrzeugwartung', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 2800.00 },
    { _id: 42, lastname: 'Frank', firstname: 'Robert', job: 'Gutachter', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 2900.00 },
    { _id: 43, lastname: 'Schuster', firstname: 'Johannes', job: 'Vertrieb', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 1500.00 },
    { _id: 44, lastname: 'Körner', firstname: 'Markus', job: 'HR', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 2000.00 },
    { _id: 45, lastname: 'Frank', firstname: 'Robert', job: 'Kundenservice', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 1700.00 },
    { _id: 46, lastname: 'Keller', firstname: 'Michael', job: 'Zentralleiter', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 5000.00 },
    { _id: 47, lastname: 'Petersen', firstname: 'Stefan', job: 'Fahrzeugwartung', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 2800.00 },
    { _id: 48, lastname: 'Lang', firstname: 'Andreas', job: 'Gutachter', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 2900.00 },
    { _id: 49, lastname: 'Arnold', firstname: 'Markus', job: 'Vertrieb', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 1500.00 },
    { _id: 50, lastname: 'Böhm', firstname: 'Robert', job: 'HR', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 2000.00 },
    { _id: 51, lastname: 'Winter', firstname: 'Michael', job: 'Kundenservice', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 1700.00 },
    { _id: 52, lastname: 'Scholz', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 5000.00 },
    { _id: 53, lastname: 'Ludwig', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 2800.00 },
    { _id: 54, lastname: 'Pfeiffer', firstname: 'Martin', job: 'Gutachter', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 2900.00 },
    { _id: 55, lastname: 'Kraus', firstname: 'Christian', job: 'Vertrieb', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 1500.00 },
    { _id: 56, lastname: 'Walter', firstname: 'Daniel', job: 'HR', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 2000.00 },
    { _id: 57, lastname: 'Schwarz', firstname: 'Johannes', job: 'Kundenservice', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 1700.00 },
    { _id: 58, lastname: 'Seidel', firstname: 'Markus', job: 'Zentralleiter', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 5000.00 },
    { _id: 59, lastname: 'Herzog', firstname: 'Robert', job: 'Fahrzeugwartung', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 2800.00 },
    { _id: 60, lastname: 'Winkler', firstname: 'Michael', job: 'Gutachter', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 2900.00 },
    { _id: 61, lastname: 'Sauer', firstname: 'Stefan', job: 'Vertrieb', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 1500.00 },
    { _id: 62, lastname: 'Heinrich', firstname: 'Andreas', job: 'HR', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 2000.00 },
    { _id: 63, lastname: 'Bergmann', firstname: 'Martin', job: 'Kundenservice', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 1700.00 },
    { _id: 64, lastname: 'Pohl', firstname: 'Christian', job: 'Zentralleiter', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 5000.00 },
    { _id: 65, lastname: 'Horn', firstname: 'Daniel', job: 'Fahrzeugwartung', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 2800.00 },
    { _id: 66, lastname: 'Busch', firstname: 'Johannes', job: 'Gutachter', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 2900.00 },
    // Next 6 employees are not assigned to any central
    { _id: 67, lastname: 'Vogel', firstname: 'Markus', job: 'Vertrieb', streetname: 'Unter den Linden 77', region: 'Berlin', zipcode: '10117', monthly_wage: 1500.00 },
    { _id: 68, lastname: 'Friedrich', firstname: 'Robert', job: 'HR', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2000.00 },
    { _id: 69, lastname: 'Keller', firstname: 'Michael', job: 'Kundenservice', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1700.00 },
    { _id: 70, lastname: 'Günther', firstname: 'Stefan', job: 'Fahrzeugwartung', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2800.00 },
    { _id: 71, lastname: 'Petersen', firstname: 'Andreas', job: 'Gutachter', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2900.00 },
    { _id: 72, lastname: 'Lang', firstname: 'Martin', job: 'Vertrieb', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 1500.00 }    
    // Add more employee documents here...
  ];
  db.employee.insertMany(employees);

  const centrals = [
    { _id: 1, name: 'Zentrale Hamburg', location: 'Flughafen', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', rent: 1000.00 , employees: [1,2,3,4,5,6] },
    { _id: 2, name: 'Zentrale Berlin', location: 'Bahnhof', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', rent: 1200.00, employees: [7,8,9,10,11,12] },
    { _id: 3, name: 'Zentrale München', location: 'Innenstadt', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', rent: 3000.00, employees: [13,14,15,16,17,18] },
    { _id: 4, name: 'Zentrale Köln', location: 'Industriegebiet', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', rent: 4500.00, employees: [19,20,21,22,23,24] },
    { _id: 5, name: 'Zentrale Frankfurt', location: 'Ländlich', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', rent: 2000.00, employees: [25,26,27,28,29,30] },
    { _id: 6, name: 'Zentrale Stuttgart', location: 'Hafen', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', rent: 3500.00, employees: [31,32,33,34,35,36] },
    { _id: 7, name: 'Zentrale Düsseldorf', location: 'Flughafen', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', rent: 4000.00, employees: [37,38,39,40,41,42] },
    { _id: 8, name: 'Zentrale Leipzig', location: 'Bahnhof', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', rent: 2500.00, employees: [43,44,45,46,47,48] },
    { _id: 9, name: 'Zentrale Dresden', location: 'Innenstadt', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', rent: 3000.00, employees: [49,50,51,52,53,54] },
    { _id: 10, name: 'Zentrale Hannover', location: 'Industriegebiet', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', rent: 4500.00, employees: [55,56,57,58,59,60] },
    { _id: 11, name: 'Zentrale Nürnberg', location: 'Ländlich', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', rent: 2000.00, employees: [61,62,63,64,65,66] }
    // Add more central documents here...
  ];
  db.central.insertMany(centrals);


  const keydatas = [
    { quater: 1, revenue: 10000, oustanding_revenue: 5000, personal_costs: 2000, rent: 1000, year: 2024, centralID: 1 },
    { quater: 2, revenue: 15000, oustanding_revenue: 7000, personal_costs: 2500, rent: 1200, year: 2024, centralID: 2 },
    // Add more keydata documents here...
  ];
  db.keydata.insertMany(keydatas);

  const performance_reports = [
    { name: 'Q1 2024', date: "01-02-2018", centralID: 1 },
    { name: 'Q2 2024', date: "01-02-2019", centralID: 2 },
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
