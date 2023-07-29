from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, url

class ReviewForm(FlaskForm):
    content = TextAreaField("Description", validators=[DataRequired()])
    stars = IntegerField("Stars", validators=[DataRequired()])
    review_img_url = StringField("Review Image")
    submit = SubmitField("Create review")
