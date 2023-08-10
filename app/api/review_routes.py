from flask import Blueprint, redirect, url_for, request
from flask_login import login_required, current_user
from app.models import db, Review, User
from .auth_routes import validation_errors_to_error_messages
from app.forms.review_form import ReviewForm

review_routes = Blueprint("reviews", __name__)

def add_User_obj(review):
    user = User.query.filter(review.user_id == User.id).first()
    reviewOwner = user.to_dict()
    reviewDict = review.to_dict()
    reviewDict["User"] = reviewOwner
    return reviewDict

@review_routes.route('/<int:id>', methods=["GET"])
def getASpecificReview(id):
    """
    Users can read a checkin/review for a drink.
    """
    review = Review.query.get(id)
    if not review:
        return {'errors': "Review could not be found"}, 404

    reviewDict = add_User_obj(review)
    return reviewDict

@review_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_review(id):
    """
    A logged in user can update one of their own reviews.
    """
    review = Review.query.get(id)
    if not review:
        return {'errors': "Review could not be found"}, 404

    if current_user.id == review.user_id:
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            review.content = form.data["content"]
            review.stars = form.data["stars"]
            review.review_img_url = form.data["review_img_url"]

            db.session.commit()

            reviewDict = add_User_obj(review)
            return reviewDict
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@review_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_review(id):
    """
    A logged in user can delete one of their own reviews, removing it from the list of visible reviews without causing a refresh/redirect.
    """
    review = Review.query.get(id)
    if not review:
        return {'errors': "Review could not be found"}, 404

    if current_user.id == review.user_id:
        db.session.delete(review)
        db.session.commit()
        return { "message": "Review successfully deleted"}, 200
    return {'errors': ['Unauthorized']}

@review_routes.route("/", methods=["GET"])
def get_reviews():
    """
    Users can read a list of checkins/reviews.
    """
    reviews = Review.query.all()
    # return {'reviews': [review.to_dict() for review in reviews]}

    reviewsList = []
    for review in reviews:
        reviewDict = add_User_obj(review)
        reviewsList.append(reviewDict)
    return {"reviews": reviewsList}
