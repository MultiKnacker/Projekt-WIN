import os

import bson.objectid
import logging
import numpy as np
from flask import current_app
from flask import Blueprint, render_template, abort, flash, session, redirect, url_for, Response
from matplotlib import pyplot as plt
from pymongo import MongoClient
from weasyprint import HTML

performance_bp = Blueprint("performance", __name__, template_folder='templates')

mongo_uri = os.environ.get("MONGO_URI")
if not mongo_uri:
  raise ValueError("No MONGO_URI environment variable set")
client = MongoClient(mongo_uri)
db = client["carrentalmanagement"]
locations_collection = db["central"]
vehicles_collection = db["vehicle"]
vehicle_costs_collection = db["vehicle_costs"]
rental_agreements_collection = db["rentalagreement"]


locations = list(locations_collection.find({}))
vehicles = list(vehicles_collection.find({}))
vehicle_costs = list(vehicle_costs_collection.find({}))
rental_agreements = list(rental_agreements_collection.find({}))

default_file_path = 'static/diagrams/'

@performance_bp.route("/performance")
def prev_performance():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  x = [1, 2, 3, 4, 5]
  y = [2, 4, 1, 5, 3]

  # Create the plot
  plt.figure(figsize=(8, 6))  # Set the figure size
  plt.plot(x, y, marker='o', linestyle='-', color='purple')

  # background color
  ax = plt.gca()
  ax.set_facecolor('darkgrey')

  # Set spine colors
  ax.spines['bottom'].set_color('black')  # Set bottom spine color to black
  ax.spines['top'].set_color('black')    # Set top spine color to black
  ax.spines['left'].set_color('black')   # Set left spine color to black
  ax.spines['right'].set_color('black')  # Set right spine color to black

  plt.xlabel('X-axis', color='black')
  plt.ylabel('Y-axis', color='black')
  plt.title('Sample Chart')

  # Save the plot as an image
  plt.savefig('static/diagrams/plot.png', bbox_inches='tight')
  plt.close()  # Close the plot to avoid memory issues

  bool = gen_Car_usage_pie_chart()

  # Render the template with the image path
  show_navbar = True
  return render_template('performanceview.html', show_navbar=show_navbar, plot_url='/diagrams/plot.png')

@performance_bp.route("/performance/pdf")
def list_performance():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  # Render HTML content
  html_content = render_template("performanceview.html", plot_url='/diagrams/plot.png')

  # Generate PDF using WeasyPrint
  pdf = HTML(string=html_content, base_url=url_for('static', filename='', _external=True)).write_pdf()

  # Optionally, you can save the PDF to a file
  # with open('output.pdf', 'wb') as f:
  #     f.write(pdf)

  # Return PDF as a response
  return Response(pdf, mimetype='application/pdf')

def gen_Car_usage_pie_chart():
  pkw_usage = 0
  lkw_usage = 0
  transport_usage = 0

  for rental_agreement in rental_agreements:
    for vehicle in vehicles:
      rental_agreement_ids = rental_agreement.get('vehicles')
      rental_agreement_id = rental_agreement_ids[0]
      current_app.logger.debug(f"rental -> {rental_agreement_id} Vehicle -> {vehicle.get('_id')}")
      if vehicle.get('_id') == rental_agreement_ids[0]:
        if vehicle.get('vehicletype') == 'PKW':
          pkw_usage += 1
        elif vehicle.get('vehicletype') == 'LKW':
          lkw_usage += 1
        elif vehicle.get('vehicletype') == 'Transporter':
          transport_usage += 1
      else:
        current_app.logger.debug(f"No match V:{vehicle.get('_id')} R:{rental_agreement_id}")


  current_app.logger.debug(f"Usages-> PKW:{pkw_usage} LKW:{lkw_usage} Transporter:{transport_usage}")

  # make data
  max = lkw_usage + pkw_usage + transport_usage
  pkw_percent = (pkw_usage / max) * 100
  lkw_percent = (lkw_usage / max) * 100
  transport_percent = (transport_usage / max) * 100

  labels = 'PKW', 'LKW', 'Transport'
  x = [pkw_percent, lkw_percent, transport_percent]

  # plot
  fig, ax = plt.subplots()
  ax.pie(x, labels=labels)
  plt.title('Sample Chart')

  # Save the plot as an image
  plt.savefig('static/diagrams/piechart.png')
  plt.close()  # Close the plot to avoid memory issues
  return True