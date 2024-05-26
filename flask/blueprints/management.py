from flask import Blueprint, render_template, abort

management_bp = Blueprint("management", __name__, template_folder='templates')

@management_bp.route("/management")
def list_management():
  show_navbar = True
  return render_template("managementview.html", show_navbar=show_navbar)