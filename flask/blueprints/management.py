from flask import Blueprint, render_template, abort, flash, session, redirect, url_for

management_bp = Blueprint("management", __name__, template_folder='templates')

@management_bp.route("/management")
def list_management():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))
  show_navbar = True
  return render_template("managementview.html", show_navbar=show_navbar)