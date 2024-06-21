from flask import Blueprint, render_template, abort, flash, session, redirect, url_for, Response
from matplotlib import pyplot as plt
from weasyprint import HTML

performance_bp = Blueprint("performance", __name__, template_folder='templates')

@performance_bp.route("/performance")
def prev_performance():
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

  # Render the template with the image path
  show_navbar = True
  return render_template('performanceview.html', show_navbar=show_navbar, plot_url='/static/diagrams/plot.png')


@performance_bp.route("/performance/pdf")
def list_performance():
  if 'username' not in session:
    flash('Please log in to access this page.', 'error')
    return redirect(url_for('login.login'))

  # Render HTML content
  html_content = render_template("performanceview.html")

  # Generate PDF using WeasyPrint
  pdf = HTML(string=html_content).write_pdf()

  # Optionally, you can save the PDF to a file
  # with open('output.pdf', 'wb') as f:
  #     f.write(pdf)

  # Return PDF as a response
  return Response(pdf, mimetype='application/pdf')

