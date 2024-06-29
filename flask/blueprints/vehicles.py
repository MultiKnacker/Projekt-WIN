import os
from flask import Blueprint, render_template, flash, session, redirect, url_for, request
from pymongo import MongoClient
from bson import ObjectId

vehicles_bp = Blueprint("vehicles", __name__, template_folder='templates')

# MongoDB-Verbindung
mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
vehicles_collection = db["vehicle"]
central_collection = db["central"]

@vehicles_bp.route("/vehicles", methods=['GET'])
def list_vehicles():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))
    
    vehicles = list(vehicles_collection.find({}))
    centrals = list(central_collection.find({}))
    central_map = {str(central["_id"]): central["name"] for central in centrals}

    # Update vehicle data with central name
    for vehicle in vehicles:
        for central in centrals:
            if vehicle["_id"] in central.get("vehicles", []):
                vehicle["central_name"] = central["name"]
                vehicle["central_id"] = central["_id"]
                break
        else:
            vehicle["central_name"] = "Unbekannt"

    show_navbar = True
    return render_template("vehiclesview.html", show_navbar=show_navbar, vehicles=vehicles, centrals=centrals)

@vehicles_bp.route("/vehicles", methods=["POST"])
def filter_vehicles():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('vehicles.list_vehicles'))

    search_term = request.form.get('search-input', '').strip()
    search_category = request.form.get('search-category')

    if not search_term:
        flash('Please enter a search term.', 'error')
        return redirect(url_for('vehicles.list_vehicles'))

    filtered_vehicles = list(vehicles_collection.find({
        search_category: {"$regex": search_term, "$options": "i"}
    }))
    centrals = list(central_collection.find({}))
    central_map = {str(central["_id"]): central["name"] for central in centrals}

    # Update vehicle data with central name
    for vehicle in filtered_vehicles:
        for central in centrals:
            if vehicle["_id"] in central.get("vehicles", []):
                vehicle["central_name"] = central["name"]
                vehicle["central_id"] = central["_id"]
                break
        else:
            vehicle["central_name"] = "Unbekannt"

    show_navbar = True
    return render_template("vehiclesview.html", show_navbar=show_navbar, vehicles=filtered_vehicles, centrals=centrals)

@vehicles_bp.route('/edit/<vehicle_id>', methods=['GET', 'POST'])
def edit_vehicle(vehicle_id):
    if not vehicle_id:
        flash('No vehicle ID provided', 'error')
        return redirect(url_for('vehicles.list_vehicles'))

    selected_vehicle = vehicles_collection.find_one({"_id": ObjectId(vehicle_id)})
    centrals = list(central_collection.find({}))

    if request.method == 'GET':
        return render_template('vehicles/edit_vehicle_modal.html', vehicle=selected_vehicle, centrals=centrals)
    elif request.method == 'POST':
        updated_data = {
            'numberplate': request.form['numberplate'],
            'fueltype': request.form['fueltype'],
            'vehicletype': request.form['vehicletype'],
            'dailyrate': request.form['dailyrate'],
            'brand': request.form['brand'],
            'model': request.form['model'],
            'ensurance': request.form['ensurance'],
            'original_price': request.form['original_price'],
            'milage': request.form['milage'],
            'date_of_purchase': request.form['date_of_purchase'],
            'state': request.form['state'],
            'central_id': ObjectId(request.form['location'])
        }
        vehicles_collection.update_one({'_id': ObjectId(vehicle_id)}, {'$set': updated_data})

        # Update central's vehicles list
        current_central_id = selected_vehicle.get("central_id")
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

        flash('Vehicle updated successfully!', 'success')
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

@vehicles_bp.route('/vehicles/add', methods=['POST'])
def add_vehicle():
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
        'date_of_purchase': request.form['date_of_purchase'],
        'state': request.form['state'],
        'central_id': ObjectId(request.form['location'])
    }
    new_vehicle_id = vehicles_collection.insert_one(new_vehicle).inserted_id

    central_id = ObjectId(request.form['location'])
    central_collection.update_one(
        {"_id": central_id},
        {"$addToSet": {"vehicles": new_vehicle_id}}
    )

    flash('Vehicle added successfully!', 'success')
    return redirect(url_for('vehicles.list_vehicles'))
