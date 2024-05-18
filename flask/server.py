#!/usr/bin/env python
import os

from flask import Flask, render_template
from pymongo import MongoClient
from blueprints.locations import location_bp
from blueprints.management import management_bp
from blueprints.vehicles import vehicles_bp
from blueprints.performance import performance_bp

app = Flask(__name__)
app.register_blueprint(location_bp)
app.register_blueprint(management_bp)
app.register_blueprint(vehicles_bp)
app.register_blueprint(performance_bp)

client = MongoClient("mongo:27017")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 9090), debug=True)