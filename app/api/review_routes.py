from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required
from app.models import User

bp = Blueprint("reviews", __name__, url_prefix="/reviews")

# A logged in user can update one of their own reviews.
@bp.route("/<int:id>", methods=["PUT"])
@login_required
def updateReview(id):
    pass

# A logged in user can delete one of their own reviews, removing it from the list of visible reviews without causing a refresh/redirect.
@bp.route("/<int:id>", methods=["DELETE"])
@login_required
def deleteReview(id):
    pass

# A logged in user can read a list of checkins/reviews.
@bp.route("/", methods=["GET"])
@login_required
def getReviews():
    pass
