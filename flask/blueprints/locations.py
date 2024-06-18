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
  documents = locations_collection.find({}, projection={"employees":0, "vehicles":0}).sort("name")
  show_navbar = True
  return render_template("location/locationview.html", show_navbar = show_navbar, data=documents)

@location_bp.route("/locations", methods=["GET", "POST"])
def filter_location():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  search_input = request.form.get('search-input')
  search_category = request.form.get('search-category')
  filtered_locations = locations_collection.find({search_category: {"$regex": search_input}},  projection={"employees":0, "vehicles":0}).sort("name")
  show_navbar = True
  return render_template("location/locationview.html", show_navbar = show_navbar, data=filtered_locations)

@location_bp.route('/locations/edit/<location_id>', methods=['GET', 'POST'])
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
                  alert_type = "success"
                  alert_String = "Location updated successfully!"
              else:
                  alert_type = "warning"
                  alert_String = "No changes detected in location data."
          else:
              alert_type = "error"
              alert_String = "Location with ID " + location_id + " not found."
      except pymongo.errors.PyMongoError as e:
          alert_type = "error"
          alert_String = "An error occurred while updating the location: " + e

      updated_documents = locations_collection.find({}, projection={"employees": 0, "vehicles": 0}).sort("name")
      return render_template("location/locationview.html",
                             show_navbar=show_navbar,
                             data=updated_documents,
                             alert_type=alert_type,
                             alert_String=alert_String)

@location_bp.route('/locations/add', methods=['GET', 'POST'])
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
            if added_response.acknowledged == True:
                alert_type = "success"
                alert_String = "Location added successfully!"
            else:
                alert_type = "error"
                alert_String = "Couldnt add the location. Please try again."
        except pymongo.errors.PyMongoError as e:
            alert_type = "error"
            alert_String = "An error occurred while adding the location: " + e

        updated_documents = locations_collection.find({}, projection={"employees": 0, "vehicles": 0}).sort("name")
        return render_template("location/locationview.html",
                           show_navbar=show_navbar,
                           data=updated_documents,
                           alert_type=alert_type,
                           alert_String=alert_String)

@location_bp.route('/locations/delete', methods=['GET', 'POST'])
def delete_locations():
    selected_locations = request.form.getlist("selected_locations[]")
    if selected_locations:
        delte_response = locations_collection.delete_many(selected_locations)
        show_navbar = True
        try:
            if delte_response.acknowledged == True:
                alert_type = "success"
                alert_String = "Location added successfully!"
            else:
                alert_type = "warning"
                alert_String = "Couldnt add the location. Please try again."
        except pymongo.errors.PyMongoError as e:
            alert_type = "error"
            alert_String = "An error occurred while adding the location: " + e

        updated_documents = locations_collection.find({}, projection={"employees": 0, "vehicles": 0}).sort("name")
        return render_template("location/locationview.html",
                               show_navbar=show_navbar,
                               data=updated_documents,
                               alert_type=alert_type,
                               alert_String=alert_String)
    else:
        updated_documents = locations_collection.find({}, projection={"employees": 0, "vehicles": 0}).sort("name")
        alert_type = "error"
        alert_String = "Couldnt add the location. Please try again."
        return render_template("location/locationview.html",
                               show_navbar=True,
                               data=updated_documents,
                               alert_type=alert_type,
                               alert_String=alert_String)