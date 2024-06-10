import os
import bcrypt
from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from pymongo import MongoClient

login_bp = Blueprint('login', __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
users_collection = db["sys_admins"]

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = users_collection.find_one({"email": email})
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            session['username'] = user['username']
            flash('Login successful!', 'success')
            return redirect(url_for('location.list_location'))
        else:
            flash('Invalid email or password', 'error')
            return redirect(url_for('login.login'))

    return render_template('loginview.html')

@login_bp.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('index'))


