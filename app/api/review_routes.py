from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user
from app.models import db, Review

review_routes = Blueprint("reviews", __name__, url_prefix="/api/reviews")

# A logged in user can update one of their own reviews.
@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def updateReview(id):
    pass

# A logged in user can delete one of their own reviews, removing it from the list of visible reviews without causing a refresh/redirect.
@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def deleteReview(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return { "message": "Successfully deleted"}

# A logged in user can read a list of checkins/reviews.
@review_routes.route("/", methods=["GET"])
@login_required
def getReviews():
    reviews = Review.query.all()
    return {'reviews': [review.to_dict() for review in reviews]}
