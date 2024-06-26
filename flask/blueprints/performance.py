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
performance_data_collection = db["keydata"]

locations = list(locations_collection.find({}))
vehicles = list(vehicles_collection.find({}))
vehicle_costs = list(vehicle_costs_collection.find({}))
rental_agreements = list(rental_agreements_collection.find({}))
performance_data = list(performance_data_collection.find({}))

default_file_path = 'static/diagrams/'

@performance_bp.route("/performance")
def prev_performance():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  vehicle_type_usage = gen_Car_usage_pie_chart()
  gen_coast_comp_bar_chart()

  # Render the template with the image path
  show_navbar = True
  return render_template('performanceview.html', show_navbar=show_navbar)

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
  filename = f"{default_file_path}/type_usage_pie_chart.png"
  pkw_usage = 0
  lkw_usage = 0
  transport_usage = 0
  if(len(rental_agreements) >= 0 &  len(vehicles) >= 0):
    for rental_agreement in rental_agreements:
      for vehicle in vehicles:
        rental_agreement_ids = rental_agreement.get('vehicles')
        rental_agreement_id = rental_agreement_ids[0]
        if vehicle.get('_id') == rental_agreement_ids[0]:
          if vehicle.get('vehicletype') == 'PKW':
            pkw_usage += 1
          elif vehicle.get('vehicletype') == 'LKW':
            lkw_usage += 1
          elif vehicle.get('vehicletype') == 'Transporter':
            transport_usage += 1
        else:
          current_app.logger.debug(f"No match V:{vehicle.get('_id')} R:{rental_agreement_id}")

    # make data
    max = lkw_usage + pkw_usage + transport_usage
    pkw_percent = (pkw_usage / max) * 100
    lkw_percent = (lkw_usage / max) * 100
    transport_percent = (transport_usage / max) * 100

    labels = 'PKW', 'LKW', 'Transport'
    x_data = [pkw_percent, lkw_percent, transport_percent]

    # plot
    plt.rcParams['figure.facecolor'] = '#222222'
    fig, ax = plt.subplots()
    colors=['darkviolet', 'blueviolet', 'slateblue', 'darkslateblue']
    ax.pie(x_data,
           labels=labels,
           autopct='%1.1f%%',
           colors=colors,
           shadow={'ox': -0.04, 'edgecolor': 'none', 'shade': 0.9},
           pctdistance=.3,
           labeldistance=.6)
    plt.title('Nutzungsverteilung der verschiedenen Fahrzeugtypen', color='white')
    plt.tight_layout

    # Save the plot as an image
    plt.savefig(filename)
    plt.close()  # Close the plot to avoid memory issues
    return filename
  else:
    current_app.logger.debug(f"Collections {rental_agreements} or {vehicles_collection} is empty.")
    return False

def gen_coast_comp_bar_chart():
  filename = f"{default_file_path}/revenue_quater.png"
  quarters = ()
  values_per_quater = {
    'Einnahmen': (),
    'zukünftige_Einnahmen': (),
    'Ausgaben' : ()}
  if(len(performance_data) >=0):
    for performance_set in performance_data:
      quarters = quarters + (performance_set.get('quater'),)

      revenue = performance_set.get('revenue', 0)  # Default to 0 for missing 'revenue'
      coast = performance_set.get('personal_costs', 0)  # Default to 0 for missing 'personal_costs'
      outstanding_revenue = performance_set.get('outstanding_revenue', 0) # Optional

      values_per_quater['Einnahmen'] = values_per_quater['Einnahmen'] + (revenue,)
      values_per_quater['zukünftige_Einnahmen'] = values_per_quater['zukünftige_Einnahmen'] + (outstanding_revenue,)
      values_per_quater['Ausgaben'] =  values_per_quater['Ausgaben'] + (coast,)

  x = np.arange(len(quarters))  # the label locations
  width = 0.25  # the width of the bars
  multiplier = 0

  fig, ax = plt.subplots(layout='constrained')

  for attribute, measurement in values_per_quater.items():
    offset = width * multiplier
    rects = ax.bar(x + offset, measurement, width, label=attribute)
    ax.bar_label(rects, padding=3)
    multiplier += 1

  ax.tick_params(axis='x', colors='white')
  ax.tick_params(axis='y', colors='white')
  ax.set_facecolor('#222222')

  ax.set_ylabel('Euro (€)', color='white')
  ax.set_title('Gewinn und Verlustrechnung' , color='white')
  ax.set_xticks(x + width, quarters)
  ax.legend(loc='upper left', ncols=3)
  ax.set_ylim(0, 30000)

  plt.savefig(filename)
  plt.close()





