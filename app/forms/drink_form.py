from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, url, Length

class DrinkForm(FlaskForm):
    name = StringField("Beer name", validators=[DataRequired(), Length(min=0, max=50)])
    abv = IntegerField("ABV", validators=[DataRequired(), Length(min=0, max=100)])
    ibu = IntegerField("IBU", validators=[DataRequired(), Length(min=0, max=130)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(min=0, max=255)])
    logo = StringField("Logo image url", validators=[url(), Length(min=0, max=255)])
    submit = SubmitField("Create drink")
