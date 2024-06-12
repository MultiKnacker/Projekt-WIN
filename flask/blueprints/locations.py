import os

from bson import ObjectId
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
  print(search_term)
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
    # ... (existing update logic)
    return jsonify({'message': 'Location updated successfully!'})
