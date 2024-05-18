from flask import Blueprint, render_template, abort

location_bp = Blueprint("location", __name__, template_folder='templates')

@location_bp.route("/locations")
def list_location():
  return render_template("locationview.html")