 // Create the users
 db.createUser({user: 'admin', pwd: 'admin', roles: [ { role: 'dbOwner', db: 'carrental' } ] });
 db.createUser({user: 'webserver', pwd: 'webserver', roles: [ { role: 'readWrite', db: 'carrental' } ] });  

 // Create the collections
 const collections = ['keydata', 'performance_report', 'central', 'employee', 'customer', 'rentalagreement', 'vehicle', 'vehicle_costs', 'vehicle_cost_types', 'sys_admins'];
 collections.forEach(collection => {
   db.createCollection(collection, function(err, res) {
     if (err) throw err;
     console.log(`Collection '${collection}' created!`);
   });
 });

 // Insert multiple documents into each collection
 const centrals = [
  { _id: 1, name: 'Zentrale Hamburg', location: 'Flughafen', streetname: 'Herberstraße 20', region: 'Hamburg', zipcode: '20359', rent: 1000.00 , employees: [1,2,3,4,5,6], vehicles: [1,2,3,4,5] },
  { _id: 2, name: 'Zentrale Berlin', location: 'Bahnhof', streetname: 'Bahnhofstraße 1', region: 'Berlin', zipcode: '10115', rent: 1200.00, employees: [7,8,9,10,11,12], vehicles: [6,7,8,9,10] },
  { _id: 3, name: 'Zentrale München', location: 'Innenstadt', streetname: 'Marienplatz 8', region: 'München', zipcode: '80331', rent: 3000.00, employees: [13,14,15,16,17,18], vehicles: [11,12,13,14,15] },
  { _id: 4, name: 'Zentrale Köln', location: 'Industriegebiet', streetname: 'Ettore-Bugatti-Straße 1', region: 'Köln', zipcode: '51149', rent: 4500.00, employees: [19,20,21,22,23,24], vehicles: [16,17,18,19,20] },
  { _id: 5, name: 'Zentrale Frankfurt', location: 'Ländlich', streetname: 'Am Burghof 55', region: 'Frankfurt', zipcode: '60437', rent: 2000.00, employees: [25,26,27,28,29,30], vehicles: [21,22,23,24,25] },
  { _id: 6, name: 'Zentrale Stuttgart', location: 'Hafen', streetname: 'Unterländer Straße 66-68', region: 'Stuttgart', zipcode: '70435', rent: 3500.00, employees: [31,32,33,34,35,36], vehicles: [26,27,28,29,30] },
  { _id: 7, name: 'Zentrale Düsseldorf', location: 'Flughafen', streetname: 'Flughafenstraße 120', region: 'Düsseldorf', zipcode: '40474', rent: 4000.00, employees: [37,38,39,40,41,42], vehicles: [31,32,33,34,35] },
  { _id: 8, name: 'Zentrale Leipzig', location: 'Bahnhof', streetname: 'Willy-Brandt-Platz 5', region: 'Leipzig', zipcode: '04109', rent: 2500.00, employees: [43,44,45,46,47,48], vehicles: [35,37,38,39,40] },
  { _id: 9, name: 'Zentrale Dresden', location: 'Innenstadt', streetname: 'Altmarkt 10', region: 'Dresden', zipcode: '01067', rent: 3000.00, employees: [49,50,51,52,53,54], vehicles: [41,42,43,44,45] },
  { _id: 10, name: 'Zentrale Hannover', location: 'Industriegebiet', streetname: 'Heinkelstraße 8', region: 'Hannover', zipcode: '30827', rent: 4500.00, employees: [55,56,57,58,59,60], vehicles: [46,47,48,49,50] },
  { _id: 11, name: 'Zentrale Nürnberg', location: 'Ländlich', streetname: 'Am Wegfeld 60', region: 'Nürnberg', zipcode: '90427', rent: 2000.00, employees: [61,62,63,64,65,66], vehicles: [51,52,53,54,55] }
  // Add more central documents here...
   // Add more central documents here...
 ];
 db.central.insertMany(centrals);

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

 const keydatas = [
   { quater: 1, revenue: 10000, oustanding_revenue: 5000, personal_costs: 2000, rent: 1000, year: 2024, centrals: 1 },
   { quater: 2, revenue: 15000, oustanding_revenue: 7000, personal_costs: 2500, rent: 1200, year: 2024, centrals: 2 },
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
  { _id: 1, numberplate: 'U-BC-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei" },
  { _id: 2, numberplate: 'V-DE-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "vermietet" },
  { _id: 3, numberplate: 'NN-OP-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 75, brand: 'Mercedes', model: 'Sprinter', ensurance: 150.00, original_price: 35000.00, milage: 0, date_of_purchase: "01-01-2024", state: "werkstatt" },
  { _id: 4, numberplate: 'W-FG-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei" },
  { _id: 5, numberplate: 'X-HI-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 6, numberplate: 'OO-PQ-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 80, brand: 'Volkswagen', model: 'Crafter', ensurance: 160.00, original_price: 36000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: 7, numberplate: 'Y-JK-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" },
  { _id: 8, numberplate: 'Z-LM-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: 9, numberplate: 'PP-QR-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 85, brand: 'Ford', model: 'Transit', ensurance: 170.00, original_price: 37000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei" },
  { _id: 10, numberplate: 'AA-NP-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: 11, numberplate: 'BB-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei" },
  { _id: 12, numberplate: 'QQ-RS-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 90, brand: 'Peugeot', model: 'Boxer', ensurance: 180.00, original_price: 38000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: 13, numberplate: 'CC-ST-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: 14, numberplate: 'DD-UV-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: 15, numberplate: 'RR-ST-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 95, brand: 'Renault', model: 'Master', ensurance: 190.00, original_price: 39000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: 16, numberplate: 'EE-WX-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei" },
  { _id: 17, numberplate: 'FF-YZ-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: 18, numberplate: 'SS-TU-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 100, brand: 'Iveco', model: 'Daily', ensurance: 200.00, original_price: 40000.00, milage: 0, date_of_purchase: "01-09-2025", state: "frei" },
  { _id: 19, numberplate: 'GG-AB-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei" },
  { _id: 20, numberplate: 'HH-CD-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 21, numberplate: 'TT-UV-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 105, brand: 'Citroen', model: 'Jumper', ensurance: 210.00, original_price: 41000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: 22, numberplate: 'II-EF-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" },
  { _id: 23, numberplate: 'JJ-GH-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: 24, numberplate: 'UU-VW-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 110, brand: 'Fiat', model: 'Ducato', ensurance: 220.00, original_price: 42000.00, milage: 100000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 25, numberplate: 'KK-IJ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: 26, numberplate: 'LL-KL-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei" },
  { _id: 27, numberplate: 'VV-WX-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 115, brand: 'Nissan', model: 'NV400', ensurance: 230.00, original_price: 43000.00, milage: 96000, date_of_purchase: "01-09-2022", state: "frei" },
  { _id: 28, numberplate: 'MM-MN-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: 29, numberplate: 'NN-OP-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: 30, numberplate: 'WW-XY-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 120, brand: 'Opel', model: 'Movano', ensurance: 240.00, original_price: 44000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: 31, numberplate: 'OO-PQ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei" },
  { _id: 32, numberplate: 'PP-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: 33, numberplate: 'XX-YZ-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 125, brand: 'Hyundai', model: 'H350', ensurance: 250.00, original_price: 45000.00, milage: 5000, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: 34, numberplate: 'QQ-RS-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei" },
  { _id: 35, numberplate: 'RR-ST-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 36, numberplate: 'YY-ZA-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 130, brand: 'Toyota', model: 'Proace', ensurance: 260.00, original_price: 46000.00, milage: 123000, date_of_purchase: "01-09-2022", state: "frei" },
  { _id: 37, numberplate: 'SS-TU-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" },
  { _id: 38, numberplate: 'TT-UV-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: 39, numberplate: 'ZZ-AB-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 135, brand: 'Peugeot', model: 'Expert', ensurance: 270.00, original_price: 47000.00, milage: 12000, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: 40, numberplate: 'UU-VW-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: 41, numberplate: 'VV-WX-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei" },
  { _id: 42, numberplate: 'AA-BC-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 140, brand: 'Citroen', model: 'Jumpy', ensurance: 280.00, original_price: 48000.00, milage: 0, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 43, numberplate: 'WW-XY-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: 44, numberplate: 'XX-YZ-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: 45, numberplate: 'BB-CD-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 145, brand: 'Fiat', model: 'Talento', ensurance: 290.00, original_price: 49000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" },
  { _id: 46, numberplate: 'OO-PQ-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei" },
  { _id: 47, numberplate: 'PP-QR-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: 48, numberplate: 'CC-DE-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 150, brand: 'Renault', model: 'Trafic', ensurance: 300.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: 49, numberplate: 'QQ-RS-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei" },
  { _id: 50, numberplate: 'RR-ST-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 51, numberplate: 'DD-EF-456', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 155, brand: 'Nissan', model: 'NV300', ensurance: 310.00, original_price: 51000.00, milage: 0, date_of_purchase: "01-05-2020", state: "frei" },
  { _id: 52, numberplate: 'SS-TU-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" },
  { _id: 53, numberplate: 'TT-UV-987', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 130, brand: 'Scania', model: 'R-Serie', ensurance: 260.00, original_price: 300000.00, milage: 0, date_of_purchase: "01-01-2024", state: "frei" },
  { _id: 54, numberplate: 'EE-FG-789', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 160, brand: 'Opel', model: 'Vivaro', ensurance: 320.00, original_price: 52000.00, milage: 0, date_of_purchase: "01-09-2021", state: "frei" },
  { _id: 55, numberplate: 'UU-VW-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 90, brand: 'BMW', model: '5er', ensurance: 180.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-05-2024", state: "frei" },
  { _id: 56, numberplate: 'VV-WX-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 140, brand: 'Mercedes', model: 'Arocs', ensurance: 280.00, original_price: 320000.00, milage: 0, date_of_purchase: "01-09-2024", state: "frei" },
  { _id: 57, numberplate: 'FF-GH-321', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 165, brand: 'Vauxhall', model: 'Vivaro', ensurance: 330.00, original_price: 53000.00, milage: 0, date_of_purchase: "01-01-2022", state: "frei" },
  { _id: 58, numberplate: 'WW-XY-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 100, brand: 'Audi', model: 'A8', ensurance: 200.00, original_price: 60000.00, milage: 0, date_of_purchase: "01-01-2025", state: "frei" },
  { _id: 59, numberplate: 'XX-YZ-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 150, brand: 'Volvo', model: 'FM', ensurance: 300.00, original_price: 340000.00, milage: 0, date_of_purchase: "01-05-2025", state: "frei" },
  { _id: 60, numberplate: 'GG-HI-654', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 170, brand: 'Iveco', model: 'Daily', ensurance: 340.00, original_price: 54000.00, milage: 0, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 61, numberplate: 'II-JK-123', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 60, brand: 'BMW', model: '3er', ensurance: 120.00, original_price: 40000.00, milage: 20000, date_of_purchase: "15-06-2020", state: "frei" },
  { _id: 62, numberplate: 'JJ-KL-456', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 110, brand: 'Volvo', model: 'FH', ensurance: 220.00, original_price: 260000.00, milage: 50000, date_of_purchase: "12-12-2021", state: "frei" },
  { _id: 63, numberplate: 'HH-IJ-987', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 175, brand: 'Mercedes', model: 'Vito', ensurance: 350.00, original_price: 55000.00, milage: 0, date_of_purchase: "01-09-2019", state: "frei" },
  { _id: 64, numberplate: 'KK-LM-789', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 70, brand: 'Mercedes', model: 'C-Klasse', ensurance: 140.00, original_price: 45000.00, milage: 30000, date_of_purchase: "01-01-2022", state: "frei" },
  { _id: 65, numberplate: 'LL-MN-321', fueltype: 'Diesel', vehicletype: 'LKW', dailyrate: 120, brand: 'MAN', model: 'TGX', ensurance: 240.00, original_price: 280000.00, milage: 60000, date_of_purchase: "01-05-2023", state: "frei" },
  { _id: 66, numberplate: 'II-JK-123', fueltype: 'Diesel', vehicletype: 'Transporter', dailyrate: 180, brand: 'Volkswagen', model: 'Transporter', ensurance: 360.00, original_price: 56000.00, milage: 0, date_of_purchase: "01-01-2016", state: "frei" },
  { _id: 67, numberplate: 'MM-NO-654', fueltype: 'Benzin', vehicletype: 'PKW', dailyrate: 80, brand: 'Audi', model: 'A6', ensurance: 160.00, original_price: 50000.00, milage: 0, date_of_purchase: "01-09-2023", state: "frei" }
  // Add more vehicle documents here... Milage ändern. Sehr oft 0 Obwohl Fahrzeug schon länger vorhanden ist
 ];
 db.vehicle.insertMany(vehicles);

 const vehicle_costs = [
  { date: '02-12-2020', costs: 500.00, vehicle_cost_types: 1, vehicles: 1 },
  { date: '15-02-2023', costs: 1000.00, vehicle_cost_types: 2, vehicles: 2 },
  { date: '01-10-2023', costs: 750.00, vehicle_cost_types: 3, vehicles: 7 },
  { date: '29-10-2023', costs: 140.00, vehicle_cost_types: 4, vehicles: 22 },
  { date: '11-09-2023', costs: 850.00, vehicle_cost_types: 2, vehicles: 37 },
  { date: '24-01-2024', costs: 900.00, vehicle_cost_types: 3, vehicles: 24 },
  { date: '15-02-2024', costs: 700.00, vehicle_cost_types: 1, vehicles: 39 },
  { date: '14-05-2024', costs: 950.00, vehicle_cost_types: 2, vehicles: 54 },
  { date: '01-05-2024', costs: 800.00, vehicle_cost_types: 3, vehicles: 30 },
  { date: '12-06-2024', costs: 140.00, vehicle_cost_types: 4, vehicles: 45 },
  { date: '25-05-2024', costs: 1100.00, vehicle_cost_types: 2, vehicles: 60 },
  { date: '23-09-2024', costs: 700.00, vehicle_cost_types: 3, vehicles: 11 },
  { date: '21-10-2024', costs: 550.00, vehicle_cost_types: 1, vehicles: 26 },
  { date: '01-09-2024', costs: 1200.00, vehicle_cost_types: 2, vehicles: 41 },
  { date: '01-01-2025', costs: 140.00, vehicle_cost_types: 4, vehicles: 13 },
  { date: '13-02-2025', costs: 500.00, vehicle_cost_types: 1, vehicles: 28 },
  { date: '01-01-2025', costs: 1000.00, vehicle_cost_types: 2, vehicles: 43 },
  { date: '06-05-2025', costs: 900.00, vehicle_cost_types: 3, vehicles: 15 },
  { date: '26-06-2025', costs: 140.00, vehicle_cost_types: 4, vehicles: 34 },
  { date: '11-06-2025', costs: 1100.00, vehicle_cost_types: 2, vehicles: 59 }
  // Add more vehicle_costs documents here... Yakup
 ];
 db.vehicle_costs.insertMany(vehicle_costs);

 const vehicle_cost_types = [
   { _id: 1, type: 'Reinigung'},
   { _id: 2,type: 'Reparatur'},
   { _id: 3,type: 'Steuern'},
   { _id: 4,type: 'TÜV'},
   // Add more vehicle_cost_types documents here... Yakup
 ];
 db.vehicle_cost_types.insertMany(vehicle_cost_types);

 const rentalagreements = [
  { _id: 1, recieves: "20-06-2020", returned: "30-06-2020", discount: 10, vehicles: 1, centrals: 1 , customers: 1},
  { _id: 2, recieves: "15-12-2021", returned: "15-01-2022", discount: 15, vehicles: 2, centrals: 2 , customers: 2},
  { _id: 3, recieves: "10-08-2020", returned: "18-08-2020", discount: 20, vehicles: 3, centrals: 3, customers: 3 },
  { _id: 4, recieves: "05-05-2022", returned: "10-05-2022", discount: 25, vehicles: 4, centrals: 4, customers: 4 },
  { _id: 5, recieves: "20-10-2023", returned: "21-10-2023", discount: 15, vehicles: 5, centrals: 5, customers: 5 },
  { _id: 6, recieves: "12-03-2021", returned: "15-03-2021", discount: 30, vehicles: 6, centrals: 6, customers: 6 },
  { _id: 7, recieves: "08-11-2020", returned: "15-11-2020", discount: 10, vehicles: 7, centrals: 7, customers: 7 },
  { _id: 8, recieves: "25-07-2022", returned: "27-07-2022", discount: 5, vehicles: 8, centrals: 8, customers: 8 },
  { _id: 9, recieves: "03-12-2023", returned: "10-12-2023", discount: 20, vehicles: 9, centrals: 9, customers: 9 },
  { _id: 10, recieves: "14-09-2021", returned: "15-09-2021", discount: 15, vehicles: 10, centrals: 10, customers: 10 },
  { _id: 11, recieves: "18-06-2020", returned: "22-06-2020", discount: 30, vehicles: 11, centrals: 1, customers: 11 },
  { _id: 12, recieves: "09-04-2022", returned: "15-04-2022", discount: 10, vehicles: 12, centrals: 2, customers: 12 },
  { _id: 13, recieves: "25-10-2023", returned: "28-10-2023", discount: 25, vehicles: 13, centrals: 3, customers: 13 },
  { _id: 14, recieves: "02-01-2021", returned: "10-01-2021", discount: 15, vehicles: 14, centrals: 4, customers: 14 },
  { _id: 15, recieves: "17-07-2022", returned: "25-07-2022", discount: 5, vehicles: 15, centrals: 5, customers: 15 },
  { _id: 16, recieves: "29-11-2023", returned: "05-12-2023", discount: 20, vehicles: 16, centrals: 6, customers: 16 },
  { _id: 17, recieves: "08-09-2020", returned: "10-09-2020", discount: 30, vehicles: 17, centrals: 7, customers: 17 },
  { _id: 18, recieves: "03-06-2021", returned: "08-06-2021", discount: 10, vehicles: 18, centrals: 8, customers: 18 },
  { _id: 19, recieves: "22-03-2022", returned: "25-03-2022", discount: 25, vehicles: 19, centrals: 9, customers: 19 },
  { _id: 20, recieves: "12-12-2023", returned: "18-12-2023", discount: 15, vehicles: 20, centrals: 10, customers: 20 },
  { _id: 21, recieves: "09-05-2020", returned: "12-05-2020", discount: 5, vehicles: 1, centrals: 1, customers: 21 },
   // Add more rentalagreement documents here... Yakup
 ];
 db.rentalagreement.insertMany(rentalagreements);

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

 const sys_admins = [
  { _id: 1, username: 'admin', password: '$2y$10$mPPbY3OnHfVKKNCj4Lai9upDyrPBarEM0rB5a2WaISj5hFMeI134m'},
  { _id: 2, username: 'adminTwo', password: '$2y$10$mPPbY3OnHfVKKNCj4Lai9upDyrPBarEM0rB5a2WaISj5hFMeI134m'}
 ];

 db.sys_admins.insertMany(sys_admins);

