from flask import Blueprint, render_template, flash, session, redirect, url_for, request
import os
import re
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
    search_category = None
    search_input = None
    if request.method == "POST":
        search_category = request.form.get("search-category")
        search_input = request.form.get("search-input")
        if search_category and search_input:
            if search_category == "central_name":
                try:
                    regx = re.compile(search_input, re.IGNORECASE)
                    central = central_collection.find_one({"name": regx})
                    if central:
                        employee_ids = central.get("employees", [])
                        query["_id"] = {"$in": employee_ids}
                except ValueError:
                    flash('Invalid Central ID format. Please enter a valid ID.', 'error')
            else:
                query[search_category] = {"$regex": search_input, "$options": "i"}
        print(f"DEBUG: Search Query: {query}")  # Debug print

    # Add central name to each employee by reverse lookup
    employees = list(employee_collection.find(query))
    centrals = list(central_collection.find())
    central_map = {}
    for central in centrals:
        for emp_id in central.get('employees', []):
            central_map[str(emp_id)] = central['name']
    
    for employee in employees:
        employee_id = str(employee['_id'])
        employee['central_name'] = central_map.get(employee_id, 'N/A')


    print(f"DEBUG: Retrieved Employees: {employees}")  # Debug print

    show_navbar = True
    if search_category or search_input:
        return render_template("managementview.html", employees=employees, centrals=centrals, show_navbar=show_navbar, search_category=search_category, search_input=search_input)
    else:
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

@management_bp.route("/add_employee", methods=["POST"])
def add_employee():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))

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

    print(f"DEBUG: Adding new employee")
    print(f"DEBUG: Employee data: {employee_data}")

    result = employee_collection.insert_one(employee_data)
    print(f"DEBUG: Insert result: {result.inserted_id}")

    flash(f"Mitarbeiter {employee_data.get('firstname')} {employee_data.get('lastname')} erfolgreich hinzugefügt.", 'success')
    return redirect(url_for('management.list_management'))

@management_bp.route("/delete_employee", methods=["POST"])
def delete_employee():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))

    employee_id = request.form.get("id")
    employee_firstname = request.form.get("firstname")
    employee_lastname = request.form.get("lastname")

    if not employee_id:
        flash('No employee ID provided.', 'error')
        return redirect(url_for('management.list_management'))

    print(f"DEBUG: Deleting employee with ID: {employee_id}")

    result = employee_collection.delete_one({"_id": ObjectId(employee_id)})
    print(f"DEBUG: Delete result: {result.deleted_count} document(s) deleted")

    if result.deleted_count == 1:
        flash(f'Mitarbeiter {employee_firstname} {employee_lastname} wurde erfolgreich gelöscht.', 'success')
    else:
        flash('Employee not found.', 'error')

    return redirect(url_for('management.list_management'))


