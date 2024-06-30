import os
import pymongo
from flask import Blueprint, render_template, abort, flash, session, redirect, url_for, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

location_bp = Blueprint("location", __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
locations_collection = db["central"]

class location_template:
    def __init__(self, name, zipcode, region, streetname, location, rent):
        self.name = name
        self.zipcode = zipcode
        self.region = region
        self.streetname = streetname
        self.location = location
        self.rent = rent

@location_bp.route("/locations")
def list_location():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))
    documents = get_updated_locations()
    show_navbar = True
    return render_template("locationview.html", show_navbar = show_navbar, data=documents)

@location_bp.route("/locations", methods=["GET", "POST"])
def filter_location():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))

    search_input = request.form.get('search-input')
    search_category = request.form.get('search-category')
    filtered_locations = get_filtered_locations(search_input, search_category)
    show_navbar = True
    if search_category or search_input:
        return render_template("locationview.html", show_navbar = show_navbar, data=filtered_locations, search_input=search_input, search_category=search_category)
    return render_template("locationview.html", show_navbar = show_navbar, data=filtered_locations)

@location_bp.route('/edit/<location_id>', methods=['GET', 'POST'])
def edit_location(location_id):
    if request.method == 'POST':
        filter_criteria = {'_id': ObjectId(location_id)}
        retrived_location = location_template(request.form.get('name'),
                                              request.form.get('zipcode'),
                                              request.form.get('region'),
                                              request.form.get('streetname'),
                                              request.form.get('location'),
                                              request.form.get('rent'))
        update_criteria = {
            "$set": {
                "name": retrived_location.name,
                "zipcode": retrived_location.zipcode,
                "region": retrived_location.region,
                "streetname": retrived_location.streetname,
                "location": retrived_location.location,
                "rent": retrived_location.rent
            }
        }
        update_response = locations_collection.update_one(filter_criteria, update_criteria)
        show_navbar = True
        try:
            if update_response.matched_count > 0:
                if update_response.modified_count > 0:
                    flash("Location updated successfully!", "success")
                else:
                    flash("No changes detected in location data.", "warning")
            else:
                alert_type = "error"
                alert_String = "Location with ID " + location_id + " not found."
        except pymongo.errors.PyMongoError as e:
            alert_type = "error"
            alert_String = "An error occurred while updating the location: " + e

        #updated_documents = get_updated_locations()
        return redirect(url_for('location.list_location'))

@location_bp.route('/add', methods=['GET', 'POST'])
def add_location():
    if request.method == 'POST':
        location_data = {
            "name": request.form.get('name'),
            "zipcode": request.form.get('zipcode'),
            "region": request.form.get('region'),
            "streetname": request.form.get('streetname'),
            "location": request.form.get('location'),
            "rent": request.form.get('rent')
        }

        added_response = locations_collection.insert_one(location_data)
        show_navbar = True
        try:
            if added_response.acknowledged:
                flash("Location added successfully!", "success")
            else:
                flash("Could not add the location. Please try again.", "warning")

        except pymongo.errors.PyMongoError as e:
            print(e)

        return redirect(url_for('location.list_location'))

@location_bp.route('/delete', methods=['POST'])
def delete_locations():
    selected_locations = request.form.get('selected-locations')

    if selected_locations:
        location_ids = [ObjectId(id.strip()) for id in selected_locations.split(',')]
        selected_docs = locations_collection.find({"_id": {"$in": location_ids}})
        location_names = [doc['name'] for doc in selected_docs]
        
        flash(f'Selected locations: {location_names}', 'info')
        try:
            delete_response = locations_collection.delete_many({"_id": {"$in": location_ids}})
            if delete_response.deleted_count > 0:
                flash("Location(s) deleted successfully!", "success")
            else:
                flash("Couldn't delete the location(s). Please try again.", "error")
        except pymongo.errors.PyMongoError as e:
            flash(f"An error occurred while deleting locations: {str(e)}", "error")
    else:
        flash("No locations selected for deletion.", "error")

    return redirect(url_for('location.list_location'))

def get_updated_locations():
    updated_locations = locations_collection.find().sort("name")
    data = []
    for location in updated_locations:
        location["employees"] = len(location.get("employees", []))
        location["vehicles"] = len(location.get("vehicles", []))
        data.append(location)
    return data

def get_filtered_locations(search_input, search_category):
    updated_locations = locations_collection.find({search_category: {"$regex": search_input, "$options": "i"}}).sort("name")
    data = []
    for location in updated_locations:
        location["employees"] = len(location.get("employees", []))
        location["vehicles"] = len(location.get("vehicles", []))
        data.append(location)
    return data
