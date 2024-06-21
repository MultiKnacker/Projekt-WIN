from flask import Blueprint, render_template, abort, flash, session, redirect, url_for, Response
from weasyprint import HTML

performance_bp = Blueprint("performance", __name__, template_folder='templates')

@performance_bp.route("/performance")
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

