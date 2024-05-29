import bcrypt
from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
from pymongo import MongoClient
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Length

login_bp = Blueprint('login', __name__, template_folder='templates')

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=4, max=20)])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=8)])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Login')

@login_bp.route('/login', methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    if login_form.validate_on_submit():
        username = login_form.username.data
        password = login_form.password.data
        remember_me = login_form.remember_me.data

        # Fetch user from database
        from flask.server import users_collection
        user = users_collection.find_one({'username': username})

        # Validate credentials (use secure password hashing!)
        if user and verify_password(password, user['password']):  # Replace with secure hashing function
            from flask.model.user import User
            login_user(User(username, user['password']), remember=remember_me)  # Update password to hashed value
            return redirect(url_for('your_protected_blueprint.protected_route'))  # Redirect to protected route

        # Login failed
        flash('Invalid username/password', 'error')
    return render_template('loginview.html', title='Login', login_form=login_form)

def generate_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))