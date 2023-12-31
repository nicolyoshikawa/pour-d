from flask_wtf import FlaskForm
from wtforms import StringField, DateField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField("First name", validators=[DataRequired()])
    last_name = StringField("Last name", validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = PasswordField('password', validators=[DataRequired()])
    birthday = DateField("Birthday", validators=[DataRequired()])
    user_img_url = StringField("User image")
