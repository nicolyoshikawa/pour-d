from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length, URL, NumberRange, Optional

class ReviewForm(FlaskForm):
    content = TextAreaField("Description", validators=[DataRequired(), Length(min=0, max=500)])
    stars = IntegerField("Stars", validators=[DataRequired(), NumberRange(min=1, max=5)])
    review_img_url = StringField("Review Image", validators=[Length(max=255), URL(), Optional()])
    submit = SubmitField("Create review")
