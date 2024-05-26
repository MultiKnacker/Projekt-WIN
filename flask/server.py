#!/usr/bin/env python
import os

from flask import Flask, render_template, redirect, url_for
from pymongo import MongoClient

from blueprints.locations import location_bp
from blueprints.management import management_bp
from blueprints.vehicles import vehicles_bp
from blueprints.performance import performance_bp
from blueprints.login import login_bp

app = Flask(__name__)
app.register_blueprint(location_bp)
app.register_blueprint(management_bp)
app.register_blueprint(vehicles_bp)
app.register_blueprint(performance_bp)
app.register_blueprint(login_bp)

client = MongoClient("mongodb://localhost:27017/")
db = client["carrentalmanagement"]
users_collection = db["sys_admins"]

@app.route('/')
def index():
    return render_template('locationview.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error404view.html'), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('error500view.html'), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 9090), debug=True)