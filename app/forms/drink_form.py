from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, URL, Length, NumberRange

class DrinkForm(FlaskForm):
    name = StringField("Beer name", validators=[DataRequired(), Length(min=0, max=50)])
    abv = IntegerField("ABV", validators=[DataRequired(), NumberRange(min=0, max=100)])
    ibu = IntegerField("IBU", validators=[DataRequired(), NumberRange(min=0, max=130)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(min=0, max=255)])
    drink_img_url = StringField("Logo image url", validators=[URL(), Length(min=0, max=255)])
    submit = SubmitField("Create drink")