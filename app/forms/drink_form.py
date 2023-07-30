from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, URL

class DrinkForm(FlaskForm):
    name = StringField("Beer name", validators=[DataRequired()])
    abv = IntegerField("ABV", validators=[DataRequired()])
    ibu = IntegerField("IBU", validators=[DataRequired()])
    description = TextAreaField("Description", validators=[DataRequired()])
    drink_img_url = StringField("Logo image url", validators=[URL()])
    submit = SubmitField("Create drink")