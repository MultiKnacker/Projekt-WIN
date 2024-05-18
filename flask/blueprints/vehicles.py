from flask import Blueprint, render_template, abort

vehicles_bp = Blueprint("vehicles", __name__, template_folder='templates')

@vehicles_bp.route("/vehicles")
def list_vehicles():
  return render_template("vehiclesview.html")