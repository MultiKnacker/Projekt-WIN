import os
from datetime import datetime, date
from turtle import pd

import numpy as np
from flask import current_app, request
from flask import Blueprint, render_template, abort, flash, session, redirect, url_for, Response
from matplotlib import pyplot as plt
from pymongo import MongoClient
from weasyprint import HTML

performance_bp = Blueprint("performance", __name__, template_folder='../../templates')

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
employee_collection = db["employee"]

locations = list(locations_collection.find({}))
vehicles = list(vehicles_collection.find({}))
vehicle_costs = list(vehicle_costs_collection.find({}))
rental_agreements = list(rental_agreements_collection.find({}))
performance_data = list(performance_data_collection.find({}))
employees = list(employee_collection.find({}))

default_file_path = 'static/diagrams/'

@performance_bp.route("/performance")
def prev_performance():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))
  else:
    vtype_usage_filename = gen_Car_usage_pie_chart()
    revenue_quater_filename = gen_coast_comp_bar_chart()

      # Render the template with the image path
    show_navbar = True
    show_toolbar = True
    return render_template('performanceview.html', show_navbar=show_navbar, show_toolbar=show_toolbar)


@performance_bp.route("/performance/pdf", methods=['GET', 'POST'])
def print_performance_pdf():
    if 'username' not in session:
        flash('Please log in to access this page.', 'error')
        return redirect(url_for('login.login'))
    else:
      if request.method == 'POST':
        current_date = date.today()
        filename = "Bericht-"
        res_filename = request.form.get('pdf_filename')
        if(len(res_filename) != 0):
          if(res_filename.endswith('-')):
            filename = res_filename
          else:
            filename = res_filename + "-"

        filename = filename + current_date.strftime("%d-%M-%Y")

        # Render HTML content
        html_content = render_template("performanceview.html", show_tooltips=False)

        # Generate PDF using WeasyPrint
        pdf = HTML(string=html_content, base_url=url_for('static', filename=filename, _external=True)).write_pdf()

        # Optionally, you can save the PDF to a file
        # with open('output.pdf', 'wb') as f:
        #     f.write(pdf)

        # Return PDF as a response
        response = Response(pdf, mimetype='application/pdf')
        response.headers['Content-Disposition'] = f"attachment; filename={filename}"
        return response
      else:
        return None


# minions

def gen_Car_usage_pie_chart():
  filename = f"{default_file_path}/type_usage_pie_chart.png"
  pkw_usage = 0
  lkw_usage = 0
  transport_usage = 0
  if(len(rental_agreements) >= 0 &  len(vehicles) >= 0):
    for rental_agreement in rental_agreements:
      for vehicle in vehicles:
        if vehicle.get('_id') == rental_agreement.get('vehicles'):
          if vehicle.get('vehicletype') == 'PKW':
            pkw_usage += 1
          elif vehicle.get('vehicletype') == 'LKW':
            lkw_usage += 1
          elif vehicle.get('vehicletype') == 'Transporter':
            transport_usage += 1

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
  # make data
  quarters = ()
  values_per_quater = {
    'Einnahmen': (),
    'zukünftige_Einnahmen': (),
    'Ausgaben' : ()}
  # adding past data
  if(len(performance_data) >=0):
    for performance_set in performance_data:
      if performance_set['year'] == date.today().year:
        quarters = quarters + (performance_set.get('quater'),)

        revenue = performance_set.get('revenue', 0.00)  # Default to 0 for missing 'revenue'
        cost = performance_set.get('cost', 0.00)  # Default to 0 for missing 'personal_costs'
        outstanding_revenue = 0.00

        values_per_quater['Einnahmen'] = values_per_quater['Einnahmen'] + (float(revenue),)
        values_per_quater['zukünftige_Einnahmen'] = values_per_quater['zukünftige_Einnahmen'] + (float(outstanding_revenue),)
        values_per_quater['Ausgaben'] =  values_per_quater['Ausgaben'] + (float(cost),)

  # adding current data (current revenue, current outstanding revenue and current cost)
  date_format = '%d.%m.%Y'
  current_date = date.today()
  current_quarter_timespan = get_start_of_quarter(current_date)

  current_app.logger.debug(f"current_date {current_date}")
  current_app.logger.debug(f"quaters:  {current_quarter_timespan}")

  rental_agreements_past_date = list()
  rental_agreements_pre_date = list()

  for rental_agreement in rental_agreements:
    receives_date = datetime.strptime(rental_agreement.get('receives', 0), date_format).date()
    return_date = datetime.strptime(rental_agreement.get('returned', 0), date_format).date()
    if(return_date != 0 and receives_date != 0):
      if(receives_date >= current_quarter_timespan.get('start_date') and return_date <= current_quarter_timespan.get('end_date')):
        if(current_date > return_date):
          current_app.logger.debug("added to rental_agreement_pre_date")
          rental_agreements_pre_date.append(rental_agreement)
        elif(current_date < receives_date):
          current_app.logger.debug("added to rental_agreement_past_date")
          rental_agreements_past_date.append(rental_agreement)

  current_app.logger.debug(f"rental_agreements_pre_date: {len(rental_agreements_pre_date)} rental_agreements_past_date: {len(rental_agreements_past_date)}")

  current_revenue = 0.00
  current_cost = 0.00
  current_outstanding_revenue = 0.00

  for rental_agreement_pre in rental_agreements_pre_date:
    for vehicle in vehicles:
      if rental_agreement_pre.get('vehicles') == vehicle.get('_id'):
        # revenue
        cost_per_day = vehicle.get('cost_per_day')
        rental_time = days_between(rental_agreement_pre.get('receives'), rental_agreement_pre.get('returned'))
        current_revenue += cost_per_day * rental_time

  for rental_agreement_past in rental_agreements_past_date:
    for vehicle in vehicles:
      # revenue
      if rental_agreement_past.get('vehicles') == vehicle.get('_id'):
        cost_per_day = vehicle.get('cost_per_day')
        rental_time = days_between(rental_agreement_past.get('receives'), rental_agreement_past.get('returned'))
        current_outstanding_revenue += cost_per_day * rental_time

  for vehicle_cost in vehicle_costs:
    cost_date = datetime.strptime(vehicle_cost.get('date', 0), date_format).date()
    if current_quarter_timespan.get('start_date') <= cost_date <= current_quarter_timespan.get('end_date'):
      current_cost += vehicle_cost.get('costs')

  for employee in employees:
    current_cost += employee.get('monthly_wage') * 3

  current_app.logger.debug(f"Collection: {values_per_quater}")
  current_app.logger.debug(f"current_revenue -> {current_revenue}")
  current_app.logger.debug(f"current_outstanding_revenue -> {current_outstanding_revenue}")
  current_app.logger.debug(f"current_cost -> {current_cost}")

  quarters += ("current",)
  values_per_quater['Einnahmen'] = values_per_quater['Einnahmen'] + (float(current_revenue),)
  values_per_quater['zukünftige_Einnahmen'] = values_per_quater['zukünftige_Einnahmen'] + (float(current_outstanding_revenue),)
  values_per_quater['Ausgaben'] = values_per_quater['Ausgaben'] + (float(current_cost),)
  y_height = max(max(values_per_quater[category]) for category in values_per_quater) + 30000

  current_app.logger.debug(f"values_per_quater: {values_per_quater}")

  # create graph
  x = np.arange(len(quarters))  # the label locations
  width = 0.25  # the width of the bars
  multiplier = 0

  plt.rcParams['figure.facecolor'] = '#222222'
  fig, ax = plt.subplots(layout='constrained')

  for attribute, measurement in values_per_quater.items():
    offset = width * multiplier
    rects = ax.bar(x + offset, measurement, width, label=attribute)
    ax.bar_label(rects, padding=3, color='white')
    multiplier += 1

  ax.tick_params(axis='x', colors='white')
  ax.tick_params(axis='y', colors='white')
  ax.set_facecolor('#222222')

  ax.set_ylabel('Euro (€)', color='white')
  ax.set_title('Gewinn und Verlustrechnung' , color='white')
  ax.set_xticks(x + width, quarters, color='white')
  ax.legend(loc='upper left', ncols=3, facecolor='#222222', labelcolor='white')
  ax.set_ylim(0, y_height)

  plt.savefig(filename)
  plt.close()

# minions
def days_between(date_str1, date_str2):
  date1 = datetime.strptime(date_str1, '%d.%m.%Y').date()
  date2 = datetime.strptime(date_str2, '%d.%m.%Y').date()

  time_delta = date2 - date1
  days_between = time_delta.days
  days_between = float(days_between)
  return days_between

def get_start_of_quarter(current_date):
  current_year = date.today().year
  quarters = [
    {'start_date' : datetime(current_year, 1, 1).date(), 'end_date' : datetime(current_year, 3, 31).date()},
    {'start_date' : datetime(current_year, 4, 1).date(), 'end_date' : datetime(current_year, 6, 30).date()},
    {'start_date' : datetime(current_year, 7, 1).date(), 'end_date' : datetime(current_year, 9, 30).date()},
    {'start_date' : datetime(current_year, 10, 1).date(), 'end_date' : datetime(current_year, 12, 31).date()}
  ]
  for quarter in quarters:
    if quarter.get('start_date') <= current_date <= quarter.get('end_date'):
      return quarter
  return None


