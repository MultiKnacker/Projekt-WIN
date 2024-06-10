import os

from flask import Blueprint, render_template, abort, flash, session, redirect, url_for
from pymongo import MongoClient

vehicles_bp = Blueprint("vehicles", __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
  raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
vehicles_collection= db["vehicle"]

cursor = vehicles_collection.find({}, projection={"_id":0}).sort("numberplate")
documents = [document for document in cursor]

@vehicles_bp.route("/vehicles")
def list_vehicles():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  show_navbar = True
  return render_template("vehiclesview.html", show_navbar=show_navbar, data=documents)