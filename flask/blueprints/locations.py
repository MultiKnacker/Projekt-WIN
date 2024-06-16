import os

import pymongo
from flask import Blueprint, render_template, abort, flash, session, redirect, url_for, request, jsonify
from pymongo import MongoClient

location_bp = Blueprint("location", __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
  raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
locations_collection = db["central"]

cursor = locations_collection.find({}, projection={"employees":0, "vehicles":0}).sort("name")
documents = [document for document in cursor]

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
  show_navbar = True
  return render_template("location/locationview.html", show_navbar = show_navbar, data=documents)

@location_bp.route("/locations", methods=["GET", "POST"])
def filter_location():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  search_term = request.form.get('search')
  filtered_locations = locations_collection.find({"name": {"$regex": search_term}},  projection={"employees":0, "vehicles":0}).sort("name")
  show_navbar = True
  return render_template("location/locationview.html", show_navbar = show_navbar, data=filtered_locations)

@location_bp.route('/edit/<location_id>', methods=['GET', 'POST'])
def edit_location(location_id):
  selected_location = None
  if location_id == None:
    flash('Please select a location.', 'error')
  for location in documents:
    if location['_id'] == int(location_id):
      selected_location = location
      break

  if request.method == 'GET':
    # Pre-populate form fields based on selected_location data
    return render_template('edit_location_modal.html', location=selected_location)
  elif request.method == 'POST':
      filter_criteria = {'_id': location_id}
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
              alert_type = "warning"
              alert_String = "Location with ID " + str(location_id) + " not found."
      except pymongo.errors.PyMongoError as e:
          alert_type = "error"
          alert_String = "An error occurred while updating the location: " + str(e)

      updated_documents = locations_collection.find({}, projection={"employees": 0, "vehicles": 0}).sort("name")
      return render_template("location/locationview.html",
                             show_navbar=show_navbar,
                             data=updated_documents,
                             alert_type=alert_type,
                             alert_String=alert_String)