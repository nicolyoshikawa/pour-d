from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, url

class DrinkForm(FlaskForm):
    abv = IntegerField("ABV", validators=[DataRequired()])
    ibu = IntegerField("IBU", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    logo = StringField("Logo image url", validators=[url()])
    submit = SubmitField("Create drink")