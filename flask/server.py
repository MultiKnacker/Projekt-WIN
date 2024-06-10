import os
from flask import Flask, render_template, redirect, url_for, session, flash
from pymongo import MongoClient

from blueprints.locations import location_bp
from blueprints.management import management_bp
from blueprints.vehicles import vehicles_bp
from blueprints.performance import performance_bp
from blueprints.login import login_bp
from blueprints.register import register_bp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'B8D4C9182BA79F36E2DB532C239A1'
app.register_blueprint(location_bp)
app.register_blueprint(management_bp)
app.register_blueprint(vehicles_bp)
app.register_blueprint(performance_bp)
app.register_blueprint(login_bp)
app.register_blueprint(register_bp)

# Use the MONGO_URI environment variable to connect to MongoDB
mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
    raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
users_collection = db["sys_admins"]

@app.route('/')
def index():
    return render_template('loginview.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('error404view.html'), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('error500view.html'), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get("FLASK_SERVER_PORT", 9091), debug=True)
