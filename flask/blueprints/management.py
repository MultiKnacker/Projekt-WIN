from flask import Blueprint, render_template, abort, flash, session, redirect, url_for, request
import os
from pymongo import MongoClient

management_bp = Blueprint("management", __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
employee_collection = db["employee"]
central_collection = db["central"]

@management_bp.route("/management", methods=["GET", "POST"])
def list_management():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))

    query = {}
    employee_ids = []
    if request.method == "POST":
        search_category = request.form.get("search-category")
        search_input = request.form.get("search-input")
        if search_category and search_input:
            if search_category == "central_id":
                try:
                    search_input = int(search_input)
                    central = central_collection.find_one({"_id": search_input})
                    if central:
                        employee_ids = central.get("employees", [])
                        query["_id"] = {"$in": employee_ids}
                except ValueError:
                    flash('Invalid Central ID format. Please enter a valid number.', 'error')
            else:
                query[search_category] = {"$regex": search_input, "$options": "i"}
        print(f"DEBUG: Search Query: {query}")  # Debug print

    employees = list(employee_collection.find(query))
    print(f"DEBUG: Retrieved Employees: {employees}")  # Debug print

    show_navbar = True
    return render_template("managementview.html", employees=employees, show_navbar=show_navbar)
