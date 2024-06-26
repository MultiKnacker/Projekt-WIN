import os
from flask import Blueprint, render_template, flash, session, redirect, url_for, request, current_app
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime

vehicles_bp = Blueprint("vehicles", __name__, template_folder='templates')

# MongoDB-Verbindung
mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
vehicles_collection = db["vehicle"]
central_collection = db["central"]

@vehicles_bp.route('/vehicles')
def list_vehicles():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('auth.login'))

    search_term = request.args.get('search_term', '').strip()
    search_category = request.args.get('search_category', '')

    # Fetch centrals
    centrals = list(central_collection.find({}))
    central_map = {str(central["_id"]): central for central in centrals}

    # Fetch vehicles
    if search_term and search_category:
        if search_category == "location":
            central_ids = [str(central["_id"]) for central in centrals if search_term.lower() in central["name"].lower()]
            vehicles = list(vehicles_collection.find({
                "central_id": {"$in": [ObjectId(cid) for cid in central_ids]}
            }))
        else:
            vehicles = list(vehicles_collection.find({
                search_category: {"$regex": search_term, "$options": "i"}
            }))
    else:
        vehicles = list(vehicles_collection.find({}))

    # Create a map from vehicle ID to central
    vehicle_central_map = {}
    for central in centrals:
        for vehicle_id in central["vehicles"]:
            vehicle_central_map[str(vehicle_id)] = central

    print(f"Vehicle Central Map: {vehicle_central_map}")  # Debug statement

    for vehicle in vehicles:
        vehicle_central_id_str = str(vehicle["_id"])
        central = vehicle_central_map.get(vehicle_central_id_str, None)
        if central:
            vehicle["central_id"] = str(central["_id"])
            vehicle["central_name"] = central["name"]
        else:
            vehicle["central_id"] = ""
            vehicle["central_name"] = "Unbekannt"
        print(f"Vehicle {vehicle['_id']} Central Name: {vehicle['central_name']}")  # Debug statement

        if 'date_of_purchase' in vehicle:
            try:
                vehicle_date = datetime.strptime(vehicle['date_of_purchase'], '%d-%m-%Y')
                vehicle['formatted_date_of_purchase'] = vehicle_date.strftime('%d-%m-%Y')
                vehicle['formatted_date_of_purchase_for_form'] = vehicle_date.strftime('%Y-%m-%d')
            except ValueError:
                vehicle['formatted_date_of_purchase'] = 'tt.mm.jjjj'
                vehicle['formatted_date_of_purchase_for_form'] = ''
        else:
            vehicle['formatted_date_of_purchase'] = 'tt.mm.jjjj'
            vehicle['formatted_date_of_purchase_for_form'] = ''

    show_navbar = True
    if search_category or search_term:
        return render_template("vehiclesview.html", show_navbar=show_navbar, vehicles=vehicles, centrals=centrals, search_category=search_category, search_term=search_term)
    return render_template("vehiclesview.html", show_navbar=show_navbar, vehicles=vehicles, centrals=centrals)



@vehicles_bp.route("/vehicles", methods=["POST"])
def filter_vehicles():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('auth.login'))

    search_term = request.form.get('search-input', '').strip()
    search_category = request.form.get('search-category')

    if not search_term:
        flash('Bitte geben Sie einen Suchbegriff ein.', 'error')
        return redirect(url_for('vehicles.list_vehicles'))

    return redirect(url_for('vehicles.list_vehicles', search_term=search_term, search_category=search_category))


@vehicles_bp.route('/edit/<vehicle_id>', methods=['GET', 'POST'])
def edit_vehicle(vehicle_id):
    if not vehicle_id:
        flash('No vehicle ID provided', 'error')
        return redirect(url_for('vehicles.list_vehicles'))

    selected_vehicle = vehicles_collection.find_one({"_id": ObjectId(vehicle_id)})
    centrals = list(central_collection.find({}))

    if request.method == 'GET':
        if 'date_of_purchase' in selected_vehicle:
            selected_vehicle["formatted_date_of_purchase"] = datetime.strptime(selected_vehicle['date_of_purchase'], '%d-%m-%Y').strftime('%Y-%m-%d')
        else:
            selected_vehicle["formatted_date_of_purchase"] = ''
        selected_vehicle["central_id"] = str(selected_vehicle.get("central_id", "Unbekannt"))
        return render_template('vehicles/edit_vehicle_modal.html', vehicle=selected_vehicle, centrals=centrals)
    elif request.method == 'POST':
        updated_data = {
            'numberplate': request.form['numberplate'],
            'fueltype': request.form['fueltype'],  # Ensure this field is processed
            'vehicletype': request.form['vehicletype'],
            'dailyrate': request.form['dailyrate'],
            'brand': request.form['brand'],
            'model': request.form['model'],
            'ensurance': request.form['ensurance'],
            'original_price': request.form['original_price'],
            'milage': request.form['milage'],
            'date_of_purchase': datetime.strptime(request.form['date_of_purchase'], '%Y-%m-%d').strftime('%d-%m-%Y'),
            'state': request.form['state'],
            'central_id': ObjectId(request.form['location'])
        }

        vehicles_collection.update_one({'_id': ObjectId(vehicle_id)}, {'$set': updated_data})

        current_central_id = selected_vehicle.get('central_id')
        new_central_id = ObjectId(request.form['location'])
        if current_central_id != new_central_id:
            if current_central_id:
                central_collection.update_one(
                    {"_id": current_central_id},
                    {"$pull": {"vehicles": ObjectId(vehicle_id)}}
                )
            central_collection.update_one(
                {"_id": new_central_id},
                {"$addToSet": {"vehicles": ObjectId(vehicle_id)}}
            )

        flash('Das Fahrzeug wurde erfolgreich angepasst!', 'success')
        return redirect(url_for('vehicles.list_vehicles'))


@vehicles_bp.route('/add_vehicle', methods=['POST'])
def add_vehicle():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('auth.login'))

    new_vehicle = {
        'numberplate': request.form['numberplate'],
        'fueltype': request.form['fueltype'],
        'vehicletype': request.form['vehicletype'],
        'dailyrate': request.form['dailyrate'],
        'brand': request.form['brand'],
        'model': request.form['model'],
        'ensurance': request.form['ensurance'],
        'original_price': request.form['original_price'],
        'milage': request.form['milage'],
        'date_of_purchase': datetime.strptime(request.form['date_of_purchase'], '%Y-%m-%d').strftime('%d-%m-%Y'),
        'state': request.form['state'],
        'central_id': ObjectId(request.form['location'])
    }

    # Überprüfen, ob ein Fahrzeug mit denselben Attributen bereits existiert
    existing_vehicle = vehicles_collection.find_one(new_vehicle)
    if existing_vehicle:
        flash('Fahrzeug bereits vorhanden.', 'error')
        return redirect(url_for('vehicles.list_vehicles'))

    # Neues Fahrzeug hinzufügen, wenn es nicht existiert
    new_vehicle_id = vehicles_collection.insert_one(new_vehicle).inserted_id

    # Fahrzeug der ausgewählten Zentrale hinzufügen
    central_id = ObjectId(request.form['location'])
    central_collection.update_one(
        {"_id": central_id},
        {"$addToSet": {"vehicles": new_vehicle_id}}
    )

    flash('Fahrzeug erfolgreich hinzugefügt!', 'success')
    return redirect(url_for('vehicles.list_vehicles'))

@vehicles_bp.route('/delete/<vehicle_id>', methods=['POST'])
def delete_vehicle(vehicle_id):
    if not vehicle_id:
        flash('No vehicle ID provided', 'error')
        return redirect(url_for('vehicles.list_vehicles'))

    selected_vehicle = vehicles_collection.find_one({"_id": ObjectId(vehicle_id)})

    if selected_vehicle:
        current_central_id = selected_vehicle.get("central_id")
        if current_central_id:
            central_collection.update_one(
                {"_id": current_central_id},
                {"$pull": {"vehicles": ObjectId(vehicle_id)}}
            )

        vehicles_collection.delete_one({"_id": ObjectId(vehicle_id)})
        flash('Das Fahrzeug wurde erfolgreich entfernt!', 'success')
    else:
        flash('Vehicle not found.', 'error')

    return redirect(url_for('vehicles.list_vehicles'))
