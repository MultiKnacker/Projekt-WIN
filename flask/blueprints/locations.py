from flask import Blueprint, render_template, abort, flash, session, redirect, url_for

location_bp = Blueprint("location", __name__, template_folder='templates')

@location_bp.route("/locations")
def list_location():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  show_navbar = True
  return render_template("locationview.html", show_navbar = show_navbar)