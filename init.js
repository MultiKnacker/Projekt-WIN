 // Create the users
 db.createUser({user: 'admin', pwd: 'admin', roles: [ { role: 'dbOwner', db: 'carrental' } ] });
 db.createUser({user: 'webserver', pwd: 'webserver', roles: [ { role: 'readWrite', db: 'carrental' } ] }); 
 db.createUser({
  user: "root",
  pwd: "example",
  roles: [{ role: "root", db: "admin" }]
});

 // Create the collections
 const collections = ['keydata', 'central', 'employee', 'customer', 'rentalagreement', 'vehicle', 'vehicle_costs', 'vehicle_cost_types', 'sys_admins'];
 collections.forEach(collection => {
   db.createCollection(collection, function(err, res) {
     if (err) throw err;
     console.log(`Collection '${collection}' created!`);
   });
 });

 const employees = [
  { _id: ObjectId(), lastname: 'Müller', firstname: 'Hans', job: 'Vertrieb', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Schmidt', firstname: 'Peter', job: 'HR', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Fischer', firstname: 'Robert', job: 'Kundenservice', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Schulz', firstname: 'Markus', job: 'Zentralleiter', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Peters', firstname: 'Robert', job: 'Fahrzeugwartung', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Berger', firstname: 'Andreas', job: 'Gutachter', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Schneider', firstname: 'Johannes', job: 'Vertrieb', streetname: 'Alexanderplatz 1', region: 'Berlin', zipcode: '10178', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Fischer', firstname: 'Robert', job: 'HR', streetname: 'Unter den Linden 77', region: 'Berlin', zipcode: '10117', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Weber', firstname: 'Michael', job: 'Kundenservice', streetname: 'Friedrichstraße 43', region: 'Berlin', zipcode: '10969', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Meyer', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Potsdamer Platz 1', region: 'Berlin', zipcode: '10785', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Wagner', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Kurfürstendamm 237', region: 'Berlin', zipcode: '10719', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Becker', firstname: 'Martin', job: 'Gutachter', streetname: 'Tauentzienstraße 9', region: 'Berlin', zipcode: '10789', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Bauer', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'König', firstname: 'Robert', job: 'HR', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Schmitt', firstname: 'Michael', job: 'Kundenservice', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Meyer', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Jung', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Hahn', firstname: 'Martin', job: 'Gutachter', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Schmidt', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Krause', firstname: 'Robert', job: 'HR', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Werner', firstname: 'Michael', job: 'Kundenservice', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Schulz', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Maier', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Lehmann', firstname: 'Martin', job: 'Gutachter', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Köhler', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Herrmann', firstname: 'Robert', job: 'HR', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Kaiser', firstname: 'Michael', job: 'Kundenservice', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Möller', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Weiss', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Hahn', firstname: 'Martin', job: 'Gutachter', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Baumann', firstname: 'Daniel', job: 'Vertrieb', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Schumacher', firstname: 'Robert', job: 'HR', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Blum', firstname: 'Michael', job: 'Kundenservice', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Winkler', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Beck', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Roth', firstname: 'Martin', job: 'Gutachter', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Arnold', firstname: 'Martin', job: 'Vertrieb', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Becker', firstname: 'Christian', job: 'HR', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Kuhn', firstname: 'Daniel', job: 'Kundenservice', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Keller', firstname: 'Johannes', job: 'Zentralleiter', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Günther', firstname: 'Markus', job: 'Fahrzeugwartung', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Frank', firstname: 'Robert', job: 'Gutachter', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Schuster', firstname: 'Johannes', job: 'Vertrieb', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Körner', firstname: 'Markus', job: 'HR', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Frank', firstname: 'Robert', job: 'Kundenservice', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Keller', firstname: 'Michael', job: 'Zentralleiter', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Petersen', firstname: 'Stefan', job: 'Fahrzeugwartung', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Lang', firstname: 'Andreas', job: 'Gutachter', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Arnold', firstname: 'Markus', job: 'Vertrieb', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Böhm', firstname: 'Robert', job: 'HR', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Winter', firstname: 'Michael', job: 'Kundenservice', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Scholz', firstname: 'Stefan', job: 'Zentralleiter', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Ludwig', firstname: 'Andreas', job: 'Fahrzeugwartung', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Pfeiffer', firstname: 'Martin', job: 'Gutachter', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Kraus', firstname: 'Christian', job: 'Vertrieb', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Walter', firstname: 'Daniel', job: 'HR', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Schwarz', firstname: 'Johannes', job: 'Kundenservice', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Seidel', firstname: 'Markus', job: 'Zentralleiter', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Herzog', firstname: 'Robert', job: 'Fahrzeugwartung', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Winkler', firstname: 'Michael', job: 'Gutachter', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Sauer', firstname: 'Stefan', job: 'Vertrieb', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Heinrich', firstname: 'Andreas', job: 'HR', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Bergmann', firstname: 'Martin', job: 'Kundenservice', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Pohl', firstname: 'Christian', job: 'Zentralleiter', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 5000.00 },
  { _id: ObjectId(), lastname: 'Horn', firstname: 'Daniel', job: 'Fahrzeugwartung', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Busch', firstname: 'Johannes', job: 'Gutachter', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Vogel', firstname: 'Markus', job: 'Vertrieb', streetname: 'Unter den Linden 77', region: 'Berlin', zipcode: '10117', monthly_wage: 1500.00 },
  { _id: ObjectId(), lastname: 'Friedrich', firstname: 'Robert', job: 'HR', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', monthly_wage: 2000.00 },
  { _id: ObjectId(), lastname: 'Keller', firstname: 'Michael', job: 'Kundenservice', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', monthly_wage: 1700.00 },
  { _id: ObjectId(), lastname: 'Günther', firstname: 'Stefan', job: 'Fahrzeugwartung', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', monthly_wage: 2800.00 },
  { _id: ObjectId(), lastname: 'Petersen', firstname: 'Andreas', job: 'Gutachter', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', monthly_wage: 2900.00 },
  { _id: ObjectId(), lastname: 'Lang', firstname: 'Martin', job: 'Vertrieb', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', monthly_wage: 1500.00 }
 ];
 db.employee.insertMany(employees);


 const vehicles = [
  { _id: ObjectId(), numberplate: 'U-BC-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'V-DE-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "vermietet" },
  { _id: ObjectId(), numberplate: 'NN-OP-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 75, brand: 'Mercedes', model: 'Sprinter', ensurance: 150.00, original_price: 35000.00, milage: 0, date_of_purchase: "01-01-2024", state: "werkstatt", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'W-FG-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'X-HI-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'OO-PQ-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 80, brand: 'Volkswagen', model: 'Crafter', ensurance: 160.00, original_price: 36000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'Y-JK-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'Z-LM-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'PP-QR-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 85, brand: 'Ford', model: 'Transit', ensurance: 170.00, original_price: 37000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'AA-NP-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'BB-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'QQ-RS-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 90, brand: 'Peugeot', model: 'Boxer', ensurance: 180.00, original_price: 38000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'CC-ST-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'DD-UV-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'RR-ST-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 95, brand: 'Renault', model: 'Master', ensurance: 190.00, original_price: 39000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'EE-WX-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'FF-YZ-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: ObjectId(), numberplate: 'SS-TU-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 100, brand: 'Iveco', model: 'Daily', ensurance: 200.00, original_price: 40000.00, milage: 0, date_of_purchase: "01-09-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'GG-AB-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'HH-CD-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'TT-UV-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 105, brand: 'Citroen', model: 'Jumper', ensurance: 210.00, original_price: 41000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'II-EF-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'JJ-GH-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'UU-VW-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 110, brand: 'Fiat', model: 'Ducato', ensurance: 220.00, original_price: 42000.00, milage: 100000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'KK-IJ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'LL-KL-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'VV-WX-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 115, brand: 'Nissan', model: 'NV400', ensurance: 230.00, original_price: 43000.00, milage: 96000, date_of_purchase: "01-09-2022", state: "frei" },
  { _id: ObjectId(), numberplate: 'MM-MN-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'NN-OP-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'WW-XY-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 120, brand: 'Opel', model: 'Movano', ensurance: 240.00, original_price: 44000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'OO-PQ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'PP-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: ObjectId(), numberplate: 'XX-YZ-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 125, brand: 'Hyundai', model: 'H350', ensurance: 250.00, original_price: 45000.00, milage: 5000, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'QQ-RS-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'RR-ST-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'YY-ZA-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 130, brand: 'Toyota', model: 'Proace', ensurance: 260.00, original_price: 46000.00, milage: 123000, date_of_purchase: "01-09-2022", state: "frei" },
  { _id: ObjectId(), numberplate: 'SS-TU-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'TT-UV-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'ZZ-AB-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 135, brand: 'Peugeot', model: 'Expert', ensurance: 270.00, original_price: 47000.00, milage: 12000, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'UU-VW-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'VV-WX-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'AA-BC-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 140, brand: 'Citroen', model: 'Jumpy', ensurance: 280.00, original_price: 48000.00, milage: 0, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'WW-XY-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'XX-YZ-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'BB-CD-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 145, brand: 'Fiat', model: 'Talento', ensurance: 290.00, original_price: 49000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'OO-PQ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'PP-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: ObjectId(), numberplate: 'CC-DE-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 150, brand: 'Renault', model: 'Trafic', ensurance: 300.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'QQ-RS-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'RR-ST-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'DD-EF-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 155, brand: 'Nissan', model: 'NV300', ensurance: 310.00, original_price: 51000.00, milage: 0, date_of_purchase: "01-05-2020", state: "frei" },
  { _id: ObjectId(), numberplate: 'SS-TU-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'TT-UV-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: ObjectId(), numberplate: 'EE-FG-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 160, brand: 'Opel', model: 'Vivaro', ensurance: 320.00, original_price: 52000.00, milage: 0, date_of_purchase: "01-09-2021", state: "frei" },
  { _id: ObjectId(), numberplate: 'UU-VW-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'VV-WX-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'FF-GH-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 165, brand: 'Vauxhall', model: 'Vivaro', ensurance: 330.00, original_price: 53000.00, milage: 0, date_of_purchase: "01-01-2022", state: "frei" },
  { _id: ObjectId(), numberplate: 'WW-XY-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei", image: "audi_r8.png" },
  { _id: ObjectId(), numberplate: 'XX-YZ-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: ObjectId(), numberplate: 'GG-HI-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 170, brand: 'Iveco', model: 'Daily', ensurance: 340.00, original_price: 54000.00, milage: 0, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'II-JK-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei", image: "bmw_x5.png" },
  { _id: ObjectId(), numberplate: 'JJ-KL-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: ObjectId(), numberplate: 'HH-IJ-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 175, brand: 'Mercedes', model: 'Vito', ensurance: 350.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-09-2019", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'KK-LM-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei", image: "mercedes_e63.png" },
  { _id: ObjectId(), numberplate: 'LL-MN-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: ObjectId(), numberplate: 'II-JK-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 180, brand: 'Volkswagen', model: 'Transporter', ensurance: 360.00, original_price: 56000.00, milage: 0, date_of_purchase: "01-01-2016", state: "frei" },
  { _id: ObjectId(), numberplate: 'MM-NO-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" }
 ];

 // Function to calculate random cost per day based on vehicle type
 function calculateCostPerDay(vehicleType) {
  switch (vehicleType) {
   case 'PKW':
    return Math.floor(Math.random() * (150.00 - 50.00 + 1)) + 50.00; // Random between 50-150
   case 'LKW':
    return Math.floor(Math.random() * (600.00 - 250.00 + 1)) + 250.00; // Random between 250-600
   case 'Transporter':
    return Math.floor(Math.random() * (180.00 - 20.00 + 1)) + 20.00; // Random between 20-180
   default:
    return 0;
  }
 }

 // Add costPerDay field to each vehicle
 vehicles.forEach(vehicle => {
  vehicle.cost_per_day = calculateCostPerDay(vehicle.vehicletype);
 });

 db.vehicle.insertMany(vehicles);
 const centrals = [
  { _id: ObjectId(), name: 'Zentrale Hamburg', location: 'Flughafen', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', rent: 1000.00 , employees: [employees[0]._id,employees[1]._id,employees[2]._id,employees[3]._id,employees[4]._id,employees[5]._id], vehicles: [vehicles[0]._id, vehicles[1]._id, vehicles[2]._id, vehicles[3]._id, vehicles[4]._id] },
  { _id: ObjectId(), name: 'Zentrale Berlin', location: 'Bahnhof', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', rent: 1200.00, employees: [employees[6]._id,employees[7]._id,employees[8]._id,employees[9]._id,employees[10]._id,employees[11]._id], vehicles: [vehicles[5]._id,vehicles[6]._id,vehicles[7]._id,vehicles[8]._id,vehicles[9]._id] },
  { _id: ObjectId(), name: 'Zentrale München', location: 'Innenstadt', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', rent: 3000.00, employees: [employees[12]._id,employees[13]._id,employees[14]._id,employees[15]._id,employees[16]._id,employees[17]._id], vehicles: [vehicles[10]._id,vehicles[11]._id,vehicles[12]._id,vehicles[13]._id,vehicles[14]._id] },
  { _id: ObjectId(), name: 'Zentrale Köln', location: 'Industriegebiet', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', rent: 4500.00, employees: [employees[18]._id,employees[19]._id,employees[20]._id,employees[21]._id,employees[22]._id,employees[23]._id], vehicles: [vehicles[15]._id,vehicles[16]._id,vehicles[17]._id,vehicles[18]._id,vehicles[19]._id] },
  { _id: ObjectId(), name: 'Zentrale Frankfurt', location: 'Ländlich', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', rent: 2000.00, employees: [employees[24]._id,employees[25]._id,employees[26]._id,employees[27]._id,employees[28]._id,employees[29]._id], vehicles: [vehicles[20]._id,vehicles[21]._id,vehicles[22]._id,vehicles[23]._id,vehicles[24]._id] },
  { _id: ObjectId(), name: 'Zentrale Stuttgart', location: 'Hafen', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', rent: 3500.00, employees: [employees[30]._id,employees[31]._id,employees[32]._id,employees[33]._id,employees[34]._id,employees[35]._id], vehicles: [vehicles[25]._id,vehicles[26]._id,vehicles[27]._id,vehicles[28]._id,vehicles[29]._id] },
  { _id: ObjectId(), name: 'Zentrale Düsseldorf', location: 'Flughafen', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', rent: 4000.00, employees: [employees[36]._id,employees[37]._id,employees[38]._id,employees[39]._id,employees[40]._id,employees[41]._id], vehicles: [vehicles[30]._id,vehicles[31]._id,vehicles[32]._id,vehicles[33]._id,vehicles[34]._id] },
  { _id: ObjectId(), name: 'Zentrale Leipzig', location: 'Bahnhof', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', rent: 2500.00, employees: [employees[42]._id,employees[43]._id,employees[44]._id,employees[45]._id,employees[46]._id,employees[47]._id], vehicles: [vehicles[30]._id,vehicles[31]._id,vehicles[32]._id,vehicles[33]._id,vehicles[34]._id] },
  { _id: ObjectId(), name: 'Zentrale Dresden', location: 'Innenstadt', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', rent: 3000.00, employees: [employees[48]._id,employees[49]._id,employees[50]._id,employees[51]._id,employees[52]._id,employees[53]._id], vehicles: [vehicles[35]._id,vehicles[36]._id,vehicles[37]._id,vehicles[38]._id,vehicles[39]._id] },
  { _id: ObjectId(), name: 'Zentrale Hannover', location: 'Industriegebiet', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', rent: 4500.00, employees: [employees[54]._id,employees[55]._id,employees[56]._id,employees[57]._id,employees[58]._id,employees[59]._id], vehicles: [vehicles[40]._id,vehicles[41]._id,vehicles[42]._id,vehicles[43]._id,vehicles[44]._id] },
  { _id: ObjectId(), name: 'Zentrale Nürnberg', location: 'Ländlich', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', rent: 2000.00, employees: [employees[60]._id,employees[61]._id,employees[62]._id,employees[63]._id,employees[64]._id,employees[65]._id], vehicles: [vehicles[50]._id,vehicles[51]._id,vehicles[52]._id,vehicles[53]._id,vehicles[54]._id] }
 ];
 db.central.insertMany(centrals);

 const keydata = [
   { quater: 1, revenue: 30000, cost: 15000, year: 2024 },
   { quater: 2, revenue: 20000, cost: 10000, year: 2024 },
   { quater: 3, revenue: 25000, cost: 11000, year: 2024 },
 ];
 db.keydata.insertMany(keydata);

 const vehicle_cost_types = [
   { _id: ObjectId(), type: 'Reinigung'},
   { _id: ObjectId(), type: 'Reparatur'},
   { _id: ObjectId(), type: 'Steuern'},
   { _id: ObjectId(), type: 'TÜV'}
 ];
 db.vehicle_cost_types.insertMany(vehicle_cost_types);

 const vehicle_costs = [
  { date: '02.12.2020', costs: 500.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[8]._id] },
  { date: '15.02.2023', costs: 1000.00, vehicle_cost_types: [vehicle_cost_types[2]._id], vehicles: [vehicles[25]._id] },
  { date: '01.10.2023', costs: 750.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[45]._id] },
  { date: '29.10.2023', costs: 140.00, vehicle_cost_types: [vehicle_cost_types[3]._id], vehicles: [vehicles[1]._id] },
  { date: '11.09.2023', costs: 850.00, vehicle_cost_types: [vehicle_cost_types[3]._id], vehicles: [vehicles[3]._id] },
  { date: '24.01.2024', costs: 900.00, vehicle_cost_types: [vehicle_cost_types[3]._id], vehicles: [vehicles[7]._id] },
  { date: '15.02.2024', costs: 700.00, vehicle_cost_types: [vehicle_cost_types[3]._id], vehicles: [vehicles[11]._id] },
  { date: '14.05.2024', costs: 950.00, vehicle_cost_types: [vehicle_cost_types[3]._id], vehicles: [vehicles[12]._id] },
  { date: '01.05.2024', costs: 800.00, vehicle_cost_types: [vehicle_cost_types[3]._id], vehicles: [vehicles[15]._id] },
  { date: '12.06.2024', costs: 140.00, vehicle_cost_types: [vehicle_cost_types[3]._id], vehicles: [vehicles[64]._id] },
  { date: '25.05.2024', costs: 1100.00, vehicle_cost_types: [vehicle_cost_types[2]._id], vehicles: [vehicles[61]._id] },
  { date: '23.09.2024', costs: 700.00, vehicle_cost_types: [vehicle_cost_types[2]._id], vehicles: [vehicles[56]._id] },
  { date: '21.10.2024', costs: 550.00, vehicle_cost_types: [vehicle_cost_types[2]._id], vehicles: [vehicles[53]._id] },
  { date: '01.09.2024', costs: 1200.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[9]._id] },
  { date: '01.01.2025', costs: 140.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[6]._id] },
  { date: '13.02.2025', costs: 500.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[33]._id] },
  { date: '01.01.2025', costs: 1000.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[36]._id] },
  { date: '06.05.2025', costs: 900.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[42]._id] },
  { date: '26.06.2025', costs: 140.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[15]._id] },
  { date: '11.06.2025', costs: 1100.00, vehicle_cost_types: [vehicle_cost_types[1]._id], vehicles: [vehicles[16]._id] }
 ];
 db.vehicle_costs.insertMany(vehicle_costs);

 const customers = [
  { _id: 1, lastname: 'Schmidt', firstname: 'Peter', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', company: ''},
  { _id: 2, lastname: 'Meyer', firstname: 'Anna', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', company: 'ABC GmbH' },
  { _id: 3, lastname: 'Becker', firstname: 'Julia', streetname: 'Schlossallee 12', region: 'München', zipcode: '80331', company: '' },
  { _id: 4, lastname: 'Schulz', firstname: 'Michael', streetname: 'Hauptstraße 5', region: 'Hamburg', zipcode: '20095', company: '' },
  { _id: 5, lastname: 'Hofmann', firstname: 'Lisa', streetname: 'Kaiserplatz 3', region: 'Frankfurt', zipcode: '60313', company: '' },
  { _id: 6, lastname: 'Wagner', firstname: 'Sarah', streetname: 'Ludwigstraße 8', region: 'Stuttgart', zipcode: '70173', company: '' },
  { _id: 7, lastname: 'Becker', firstname: 'Andreas', streetname: 'Rathausplatz 7', region: 'Düsseldorf', zipcode: '40213', company: '' },
  { _id: 8, lastname: 'Schulz', firstname: 'Sophie', streetname: 'Friedrichstraße 10', region: 'Dresden', zipcode: '01067', company: '' },
  { _id: 9, lastname: 'Fischer', firstname: 'Max', streetname: 'Wilhelmstraße 15', region: 'Hannover', zipcode: '30167', company: '' },
  { _id: 10, lastname: 'Müller', firstname: 'Laura', streetname: 'Glockengießerstraße 9', region: 'Leipzig', zipcode: '04109', company: '' },
  { _id: 11, lastname: 'Hartmann', firstname: 'Kevin', streetname: 'Augustusplatz 2', region: 'Dresden', zipcode: '01067', company: '' },
  { _id: 12, lastname: 'Schneider', firstname: 'Maria', streetname: 'Goethestraße 6', region: 'Stuttgart', zipcode: '70178', company: '' },
  { _id: 13, lastname: 'Koch', firstname: 'Nina', streetname: 'Königstraße 20', region: 'Hamburg', zipcode: '20457', company: '' },
  { _id: 14, lastname: 'Bauer', firstname: 'Tim', streetname: 'Marktplatz 4', region: 'München', zipcode: '80331', company: '' },
  { _id: 15, lastname: 'Hoffmann', firstname: 'Sarah', streetname: 'Schlossstraße 8', region: 'Frankfurt', zipcode: '60313', company: '' },
  { _id: 16, lastname: 'Schuster', firstname: 'David', streetname: 'Königsallee 5', region: 'Düsseldorf', zipcode: '40212', company: '' },
  { _id: 17, lastname: 'Neumann', firstname: 'Lena', streetname: 'Marienplatz 3', region: 'Hannover', zipcode: '30159', company: '' },
  { _id: 18, lastname: 'Schmidt', firstname: 'Jan', streetname: 'Musterstraße 7', region: 'Leipzig', zipcode: '04109', company: '' },
  { _id: 19, lastname: 'Kühn', firstname: 'Laura', streetname: 'Lindenstraße 14', region: 'Dortmund', zipcode: '44135', company: '' },
  { _id: 20, lastname: 'Bergmann', firstname: 'Tobias', streetname: 'Neuer Weg 3', region: 'Berlin', zipcode: '10117', company: '' },
  { _id: 21, lastname: 'Wolf', firstname: 'Sabine', streetname: 'Mühlenweg 6', region: 'Essen', zipcode: '45127', company: '' },
   // Add more customer documents here... Yakup
 ];
 db.customer.insertMany(customers);

 const rentalagreements = [
  { _id: ObjectId(), receives: "20.06.2020", returned: "30.06.2020", discount: 10, vehicles: [vehicles[1]._id], centrals: [centrals[1]._id] , customers: [customers[1]._id]},
  { _id: ObjectId(), receives: "15.12.2021", returned: "15.01.2022", discount: 15, vehicles: [vehicles[2]._id], centrals: [centrals[2]._id] , customers: [customers[2]._id]},
  { _id: ObjectId(), receives: "10.08.2020", returned: "18.08.2020", discount: 20, vehicles: [vehicles[3]._id], centrals: [centrals[3]._id], customers: [customers[3]._id] },
  { _id: ObjectId(), receives: "05.05.2022", returned: "10.05.2022", discount: 25, vehicles: [vehicles[4]._id], centrals: [centrals[4]._id], customers: [customers[4]._id] },
  { _id: ObjectId(), receives: "20.10.2023", returned: "21.10.2023", discount: 15, vehicles: [vehicles[5]._id], centrals: [centrals[5]._id], customers: [customers[5]._id] },
  { _id: ObjectId(), receives: "12.03.2021", returned: "15.03.2021", discount: 30, vehicles: [vehicles[6]._id], centrals: [centrals[6]._id], customers: [customers[6]._id] },
  { _id: ObjectId(), receives: "08.11.2020", returned: "15.11.2020", discount: 10, vehicles: [vehicles[7]._id], centrals: [centrals[7]._id], customers: [customers[7]._id] },
  { _id: ObjectId(), receives: "25.07.2022", returned: "27.07.2022", discount: 5, vehicles: [vehicles[8]._id], centrals: [centrals[8]._id], customers: [customers[8]._id] },
  { _id: ObjectId(), receives: "03.12.2023", returned: "10.12.2023", discount: 20, vehicles: [vehicles[9]._id], centrals: [centrals[9]._id], customers: [customers[9]._id] },
  { _id: ObjectId(), receives: "14.09.2021", returned: "15.09.2021", discount: 15, vehicles: [vehicles[10]._id], centrals: [centrals[10]._id], customers: [customers[10]._id] },
  { _id: ObjectId(), receives: "18.06.2020", returned: "22.06.2020", discount: 30, vehicles: [vehicles[11]._id], centrals: [centrals[1]._id], customers: [customers[11]._id] },
  { _id: ObjectId(), receives: "09.04.2022", returned: "15.04.2022", discount: 10, vehicles: [vehicles[12]._id], centrals: [centrals[2]._id], customers: [customers[12]._id] },
  { _id: ObjectId(), receives: "25.10.2023", returned: "28.10.2023", discount: 25, vehicles: [vehicles[13]._id], centrals: [centrals[3]._id], customers: [customers[13]._id] },
  { _id: ObjectId(), receives: "02.01.2021", returned: "10.01.2021", discount: 15, vehicles: [vehicles[14]._id], centrals: [centrals[4]._id], customers: [customers[14]._id] },
  { _id: ObjectId(), receives: "17.07.2022", returned: "25.07.2022", discount: 5, vehicles: [vehicles[15]._id], centrals: [centrals[5]._id], customers: [customers[15]._id] },
  { _id: ObjectId(), receives: "29.11.2023", returned: "05.12.2023", discount: 20, vehicles: [vehicles[16]._id], centrals: [centrals[6]._id], customers: [customers[16]._id] },
  { _id: ObjectId(), receives: "08.09.2020", returned: "10.09.2020", discount: 30, vehicles: [vehicles[17]._id], centrals: [centrals[7]._id], customers: [customers[17]._id] },
  { _id: ObjectId(), receives: "03.06.2021", returned: "08.06.2021", discount: 10, vehicles: [vehicles[18]._id], centrals: [centrals[8]._id], customers: [customers[18]._id] },
  { _id: ObjectId(), receives: "22.03.2022", returned: "25.03.2022", discount: 25, vehicles: [vehicles[19]._id], centrals: [centrals[9]._id], customers: [customers[19]._id] },
  { _id: ObjectId(), receives: "12.12.2023", returned: "18.12.2023", discount: 15, vehicles: [vehicles[20]._id], centrals: [centrals[10]._id], customers: [customers[20]._id] },
  { _id: ObjectId(), receives: "27.12.2023", returned: "03.01.2024", discount: 10, vehicles: [vehicles[2]._id],  centrals: [centrals[1]._id],  customers: [customers[8]._id] },
  { _id: ObjectId(), receives: "10.02.2024", returned: "15.02.2024", discount: 20, vehicles: [vehicles[14]._id], centrals: [centrals[3]._id], customers: [customers[15]._id] },
  {_id: ObjectId(),  receives: "08.03.2024", returned: "12.03.2024", discount: 5,  vehicles: [vehicles[7]._id],  centrals: [centrals[5]._id], customers: [customers[3]._id] },
  {_id: ObjectId(),  receives: "20.03.2024", returned: "27.03.2024", discount: 15, vehicles: [vehicles[11]._id], centrals: [centrals[7]._id], customers: [customers[10]._id] },
  {_id: ObjectId(),  receives: "15.04.2024", returned: "20.04.2024", discount: 25, vehicles: [vehicles[3]._id],  centrals: [centrals[9]._id], customers: [customers[17]._id] }
 ];

 function getRandomFutureDate() {
  const today = new Date();
  const futureMonth = today.getMonth(); // Get next month
  const futureYear = futureMonth === 12 ? today.getFullYear() + 1 : today.getFullYear();
  const randomDay = Math.floor(Math.random() * 30) + 1; // Random day between 1 and 30
  return new Date(futureYear, futureMonth, randomDay);
 }

 function formatDateToString(date) {
  return date.toLocaleDateString('de-DE', {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit',
   separator: '.'
  })
 }

 for (let i = 0; i < 200; i++) {
  const vehicle = vehicles[Math.floor(Math.random() * vehicles.length)]; // Pick random vehicle
  const central = centrals[Math.floor(Math.random() * centrals.length)];
  const customer = customers[Math.floor(Math.random() * customers.length)];

  let rentalStartDate = getRandomFutureDate();
  let rentalEndDate = new Date(rentalStartDate.getTime());
  rentalEndDate.setDate(rentalStartDate.getDate() + Math.floor(Math.random() * 10) + 1); // Random duration between 1 and 10 days

  // Ensure rental end date is after rental start date
  if (rentalEndDate < rentalStartDate) {
   const tempDate = rentalEndDate;
   rentalEndDate = rentalStartDate;
   rentalStartDate = tempDate;
  }

  rentalagreements.push({
   receives: formatDateToString(rentalStartDate),
   returned: formatDateToString(rentalEndDate),
   discount: 0,
   vehicles: vehicle._id,
   centrals: central._id,
   customers: customer._id,
  });
 }

 db.rentalagreement.insertMany(rentalagreements, (err, result) => {
  if (err) throw err;
  console.log(`Successfully inserted ${result.insertedCount} rental agreements.`);
 });

 const sys_admins = [
  { _id: 1, username: 'admin', email: 'admin@admin.de', password: '$2y$10$mPPbY3OnHfVKKNCj4Lai9upDyrPBarEM0rB5a2WaISj5hFMeI134m'},
  { _id: 3, username: 'test', email: 'test@test.de', password: '$2b$12$zzb5E8.3KhVZH.M8iXJPeeth21HXABIzXlan88rAT4J1rFmZtr/CK'}
 ];

 db.sys_admins.insertMany(sys_admins);

