from flask import Blueprint, render_template, abort, flash, session, redirect, url_for

performance_bp = Blueprint("performance", __name__, template_folder='templates')

@performance_bp.route("/performance")
def list_performance():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  show_navbar = True
  return render_template("performanceview.html", show_navbar=show_navbar)