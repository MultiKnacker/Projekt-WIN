from flask import Blueprint, render_template, flash, session, redirect, url_for, request
import os
from bson.objectid import ObjectId
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
                    search_input = ObjectId(search_input)
                    central = central_collection.find_one({"_id": search_input})
                    if central:
                        employee_ids = central.get("employees", [])
                        query["_id"] = {"$in": employee_ids}
                except ValueError:
                    flash('Invalid Central ID format. Please enter a valid ID.', 'error')
            else:
                query[search_category] = {"$regex": search_input, "$options": "i"}
        print(f"DEBUG: Search Query: {query}")  # Debug print

    employees = list(employee_collection.find(query))
    centrals = list(central_collection.find())

    # Add central name to each employee by reverse lookup
    central_map = {}
    for central in centrals:
        for emp_id in central.get('employees', []):
            central_map[str(emp_id)] = central['name']
    
    for employee in employees:
        employee_id = str(employee['_id'])
        employee['central_name'] = central_map.get(employee_id, 'N/A')

    print(f"DEBUG: Retrieved Employees: {employees}")  # Debug print

    show_navbar = True
    return render_template("managementview.html", employees=employees, centrals=centrals, show_navbar=show_navbar)

@management_bp.route("/edit_employee", methods=["POST"])
def edit_employee():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))

    employee_id = request.form.get("id")
    employee_data = {
        "lastname": request.form.get("lastname"),
        "firstname": request.form.get("firstname"),
        "job": request.form.get("job"),
        "streetname": request.form.get("streetname"),
        "region": request.form.get("region"),
        "zipcode": request.form.get("zipcode"),
        "monthly_wage": request.form.get("monthly_wage"),
        "central_id": ObjectId(request.form.get("central_id"))
    }

    print(f"DEBUG: Updating employee with ID: {employee_id}")
    print(f"DEBUG: New employee data: {employee_data}")

    result = employee_collection.update_one({"_id": ObjectId(employee_id)}, {"$set": employee_data})
    print(f"DEBUG: Update result: {result.modified_count} document(s) updated")

    flash('Employee details updated successfully.', 'success')
    return redirect(url_for('management.list_management'))
