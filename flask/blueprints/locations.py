import os

from flask import Blueprint, render_template, abort, flash, session, redirect, url_for
from pymongo import MongoClient

location_bp = Blueprint("location", __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
  raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
locations_collection = db["central"]

cursor = locations_collection.find({}, projection={"employees":0, "vehicles":0}).sort("location_name")
documents = [document for document in cursor]

@location_bp.route("/locations")
def list_location():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))
  show_navbar = True

  return render_template("locationview.html", show_navbar = show_navbar, data=documents)