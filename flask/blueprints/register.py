import os
import bcrypt
from flask import Blueprint, render_template, request, redirect, url_for, flash
from pymongo import MongoClient

register_bp = Blueprint('register', __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
users_collection = db["sys_admins"]
carrental_collection = db["c"]

@register_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if users_collection.find_one({"email": email}):
            flash(f'Email address {email} already exists.', 'danger')
            return redirect(url_for('register.register'))

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = {"username": username, "email": email, "password": hashed_password.decode('utf-8')}
        users_collection.insert_one(new_user)
        
        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('login.login'))

    return render_template('registerview.html')
