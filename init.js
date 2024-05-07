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

  const vehicles = [
    { _id: 'U-BC-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020" },
    { _id: 'V-DE-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021" },
    { _id: 'NN-OP-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 75, brand: 'Mercedes', model: 'Sprinter', ensurance: 150.00, original_price: 35000.00, milage: 0, date_of_purchase: "01-01-2024" },
    { _id: 'W-FG-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022" },
    { _id: 'X-HI-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023" },
    { _id: 'OO-PQ-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 80, brand: 'Volkswagen', model: 'Crafter', ensurance: 160.00, original_price: 36000.00, milage: 0, date_of_purchase: "01-05-2024" },
    { _id: 'Y-JK-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023" },
    { _id: 'Z-LM-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024" },
    { _id: 'PP-QR-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 85, brand: 'Ford', model: 'Transit', ensurance: 170.00, original_price: 37000.00, milage: 0, date_of_purchase: "01-09-2024" },
    { _id: 'AA-NP-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024" },
    { _id: 'BB-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024" },
    { _id: 'QQ-RS-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 90, brand: 'Peugeot', model: 'Boxer', ensurance: 180.00, original_price: 38000.00, milage: 0, date_of_purchase: "01-01-2025" },
    { _id: 'CC-ST-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025" },
    { _id: 'DD-UV-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025" },
    { _id: 'RR-ST-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 95, brand: 'Renault', model: 'Master', ensurance: 190.00, original_price: 39000.00, milage: 0, date_of_purchase: "01-05-2025" },
    { _id: 'EE-WX-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020" },
    { _id: 'FF-YZ-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021" },
    { _id: 'SS-TU-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 100, brand: 'Iveco', model: 'Daily', ensurance: 200.00, original_price: 40000.00, milage: 0, date_of_purchase: "01-09-2025" },
    { _id: 'GG-AB-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022" },
    { _id: 'HH-CD-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023" },
    { _id: 'TT-UV-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 105, brand: 'Citroen', model: 'Jumper', ensurance: 210.00, original_price: 41000.00, milage: 0, date_of_purchase: "01-01-2025" },
    { _id: 'II-EF-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023" },
    { _id: 'JJ-GH-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024" },
    { _id: 'UU-VW-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 110, brand: 'Fiat', model: 'Ducato', ensurance: 220.00, original_price: 42000.00, milage: 100000, date_of_purchase: "01-05-2023" },
    { _id: 'KK-IJ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024" },
    { _id: 'LL-KL-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024" },
    { _id: 'VV-WX-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 115, brand: 'Nissan', model: 'NV400', ensurance: 230.00, original_price: 43000.00, milage: 96000, date_of_purchase: "01-09-2022" },
    { _id: 'MM-MN-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025" },
    { _id: 'NN-OP-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025" },
    { _id: 'WW-XY-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 120, brand: 'Opel', model: 'Movano', ensurance: 240.00, original_price: 44000.00, milage: 0, date_of_purchase: "01-01-2024" },
    { _id: 'OO-PQ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020" },
    { _id: 'PP-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021" },
    { _id: 'XX-YZ-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 125, brand: 'Hyundai', model: 'H350', ensurance: 250.00, original_price: 45000.00, milage: 5000, date_of_purchase: "01-05-2024" },
    { _id: 'QQ-RS-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022" },
    { _id: 'RR-ST-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023" },
    { _id: 'YY-ZA-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 130, brand: 'Toyota', model: 'Proace', ensurance: 260.00, original_price: 46000.00, milage: 123000, date_of_purchase: "01-09-2022" },
    { _id: 'SS-TU-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023" },
    { _id: 'TT-UV-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024" },
    { _id: 'ZZ-AB-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 135, brand: 'Peugeot', model: 'Expert', ensurance: 270.00, original_price: 47000.00, milage: 12000, date_of_purchase: "01-01-2024" },
    { _id: 'UU-VW-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024" },
    { _id: 'VV-WX-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024" },
    { _id: 'AA-BC-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 140, brand: 'Citroen', model: 'Jumpy', ensurance: 280.00, original_price: 48000.00, milage: 0, date_of_purchase: "01-05-2023" },
    { _id: 'WW-XY-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025" },
    { _id: 'XX-YZ-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025" },
    { _id: 'BB-CD-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 145, brand: 'Fiat', model: 'Talento', ensurance: 290.00, original_price: 49000.00, milage: 0, date_of_purchase: "01-09-2023" },
    { _id: 'OO-PQ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020" },
    { _id: 'PP-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021" },
    { _id: 'CC-DE-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 150, brand: 'Renault', model: 'Trafic', ensurance: 300.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-01-2024" },
    { _id: 'QQ-RS-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022" },
    { _id: 'RR-ST-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023" },
    { _id: 'DD-EF-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 155, brand: 'Nissan', model: 'NV300', ensurance: 310.00, original_price: 51000.00, milage: 0, date_of_purchase: "01-05-2020" },
    { _id: 'SS-TU-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023" },
    { _id: 'TT-UV-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024" },
    { _id: 'EE-FG-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 160, brand: 'Opel', model: 'Vivaro', ensurance: 320.00, original_price: 52000.00, milage: 0, date_of_purchase: "01-09-2021" },
    { _id: 'UU-VW-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024" },
    { _id: 'VV-WX-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024" },
    { _id: 'FF-GH-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 165, brand: 'Vauxhall', model: 'Vivaro', ensurance: 330.00, original_price: 53000.00, milage: 0, date_of_purchase: "01-01-2022" },
    { _id: 'WW-XY-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025" },
    { _id: 'XX-YZ-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025" },
    { _id: 'GG-HI-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 170, brand: 'Iveco', model: 'Daily', ensurance: 340.00, original_price: 54000.00, milage: 0, date_of_purchase: "01-05-2023" },
    { _id: 'II-JK-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020" },
    { _id: 'JJ-KL-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021" },
    { _id: 'HH-IJ-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 175, brand: 'Mercedes', model: 'Vito', ensurance: 350.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-09-2019" },
    { _id: 'KK-LM-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022" },
    { _id: 'LL-MN-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023" },
    { _id: 'II-JK-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 180, brand: 'Volkswagen', model: 'Transporter', ensurance: 360.00, original_price: 56000.00, milage: 0, date_of_purchase: "01-01-2016" },
    { _id: 'MM-NO-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023" }
    // Add more vehicle documents here... Milage ändern. Sehr oft 0 Obwohl Fahrzeug schon länger vorhanden ist
  ];
  db.vehicle.insertMany(vehicles);

  const centrals = [
    { _id: 1, name: 'Zentrale Hamburg', location: 'Flughafen', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', rent: 1000.00 , employees: [1,2,3,4,5,6], vehicles: ['M-XY-789', 'D-EF-321', 'K-LM-654', 'S-NP-987', 'NN-OP-123'] },
    { _id: 2, name: 'Zentrale Berlin', location: 'Bahnhof', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', rent: 1200.00, employees: [7,8,9,10,11,12], vehicles: ['H-QR-123', 'F-ST-456', 'N-UV-789', 'P-WX-321', 'OO-PQ-456'] },
    { _id: 3, name: 'Zentrale München', location: 'Innenstadt', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', rent: 3000.00, employees: [13,14,15,16,17,18], vehicles: ['R-YZ-654', 'T-AB-987', 'U-BC-123', 'V-DE-456', 'PP-QR-789'] },
    { _id: 4, name: 'Zentrale Köln', location: 'Industriegebiet', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', rent: 4500.00, employees: [19,20,21,22,23,24], vehicles: ['K-LM-654', 'S-NP-987', 'H-QR-123', 'F-ST-456', 'QQ-RS-321'] },
    { _id: 5, name: 'Zentrale Frankfurt', location: 'Ländlich', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', rent: 2000.00, employees: [25,26,27,28,29,30], vehicles: ['N-UV-789', 'P-WX-321', 'R-YZ-654', 'T-AB-987', 'RR-ST-654'] },
    { _id: 6, name: 'Zentrale Stuttgart', location: 'Hafen', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', rent: 3500.00, employees: [31,32,33,34,35,36], vehicles: ['U-BC-123', 'V-DE-456', 'K-LM-654', 'S-NP-987', 'SS-TU-987'] },
    { _id: 7, name: 'Zentrale Düsseldorf', location: 'Flughafen', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', rent: 4000.00, employees: [37,38,39,40,41,42], vehicles: ['H-QR-123', 'F-ST-456', 'N-UV-789', 'P-WX-321', 'TT-UV-123'] },
    { _id: 8, name: 'Zentrale Leipzig', location: 'Bahnhof', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', rent: 2500.00, employees: [43,44,45,46,47,48], vehicles: ['R-YZ-654', 'T-AB-987', 'U-BC-123', 'V-DE-456', 'UU-VW-456'] },
    { _id: 9, name: 'Zentrale Dresden', location: 'Innenstadt', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', rent: 3000.00, employees: [49,50,51,52,53,54], vehicles: ['K-LM-654', 'S-NP-987', 'H-QR-123', 'F-ST-456', 'VV-WX-789']},
    { _id: 10, name: 'Zentrale Hannover', location: 'Industriegebiet', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', rent: 4500.00, employees: [55,56,57,58,59,60], vehicles: ['N-UV-789', 'P-WX-321', 'R-YZ-654', 'T-AB-987', 'WW-XY-321'] },
    { _id: 11, name: 'Zentrale Nürnberg', location: 'Ländlich', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', rent: 2000.00, employees: [61,62,63,64,65,66], vehicles: ['U-BC-123', 'V-DE-456', 'K-LM-654', 'S-NP-987', 'XX-YZ-456'] }
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

  const vehicle_costs = [
    { date: '02-12-2020', costs: 500.00, vehicle_cost_types: 1, vehicles: 'U-BC-123' },
    { date: '15-02-2023', costs: 1000.00, vehicle_cost_types: 2, vehicles: 'V-DE-456' },
    // Add more vehicle_costs documents here... Yakup
  ];
  db.vehicle_costs.insertMany(vehicle_costs);

  const vehicle_cost_types = [
    { id_: 1, type: 'Reinigung'},
    { id_: 2, type: 'Reparatur'},
    { id_: 3, type: 'Totalschaden'},
    { id_: 4, type: 'Instandsetzung'},
    { id_: 5, type: 'Aufbereitung'},
    // Add more vehicle_cost_types documents here... Yakup
  ];
  db.vehicle_cost_types.insertMany(vehicle_cost_types);

  const customers = [
    { customerID: 1, lastname: 'Schmidt', firstname: 'Peter', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', company: ''},
    { customerID: 2, lastname: 'Meyer', firstname: 'Anna', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', company: 'ABC GmbH' },
    // Add more customer documents here... Yakup
  ];
  db.customer.insertMany(customers);

  const rentalagreements = [
    { _id: 'RA123', recieves: "20-06-2020", returned: "30-06-2020", discount: 10, vehicles: 'U-BC-123', centrals: 1 , customers: 1},
    { _id: 'RA456', recieves: "15-12-2021", returned: "15-01-2022", discount: 15, vehicles: 'V-DE-456', centrals: 2 , customers: 2},
    // Add more rentalagreement documents here... Yakup
  ];
  db.rentalagreement.insertMany(rentalagreements);
