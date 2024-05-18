from flask import Blueprint, render_template, abort

performance_bp = Blueprint("performance", __name__, template_folder='templates')

@performance_bp.route("/performance")
def list_performance():
  return render_template("performanceview.html")