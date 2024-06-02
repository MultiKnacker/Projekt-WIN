from flask import Blueprint, render_template, abort, flash, session, redirect, url_for

vehicles_bp = Blueprint("vehicles", __name__, template_folder='templates')

@vehicles_bp.route("/vehicles")
def list_vehicles():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  show_navbar = True
  return render_template("vehiclesview.html", show_navbar=show_navbar)