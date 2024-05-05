from random import choice, uniform
from bson import ObjectId

# Liste von verfügbaren Fahrzeugmodellen
vehicle_models = ['C-Klasse', 'Golf', 'Passat', 'A-Klasse', '3er', 'Audi A4', 'E-Klasse', 'Polo', 'Tiguan', 'Q5']

# Funktion zur Generierung von Fahrzeugen
def generate_vehicles(num_vehicles):
    vehicles = []
    for _ in range(num_vehicles):
        vehicle = {
            'brand': 'Mercedes',  # Marke
            'model': choice(vehicle_models),  # Modell
            'type': choice(['PKW', 'LKW', 'Transporter']),  # Fahrzeugtyp
            'fueltype': choice(['Benzin', 'Diesel', 'Wasserstoff', 'LPG', 'Elektrisch']),  # Kraftstofftyp
            'dailyrate': round(uniform(50.00, 300.00), 2),  # Tagesmiete
            'centralId': ObjectId("612a12545c368a067abc1238")  # ID der Zentrale
        }
        vehicles.append(vehicle)
    return vehicles

# Anzahl der zu generierenden Fahrzeuge
num_vehicles = 5

# Generiere Fahrzeuge
vehicles = generate_vehicles(num_vehicles)

# Schreibe die Fahrzeuge in eine Textdatei
output_filename = 'fahrzeuge.txt'
with open(output_filename, 'w') as f:
    for vehicle in vehicles:
        f.write("{\n")
        f.write(f"brand: \"{vehicle['brand']}\",\n")
        f.write(f"model: \"{vehicle['model']}\",\n")
        f.write(f"type: \"{vehicle['type']}\",\n")
        f.write(f"fueltype: \"{vehicle['fueltype']}\",\n")
        f.write(f"dailyrate: \"{vehicle['dailyrate']}\",\n")
        f.write(f"centralId: \"{vehicle['centralId']}\",\n")
        f.write("},\n")