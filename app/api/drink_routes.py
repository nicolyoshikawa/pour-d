from flask import Blueprint, request
from app.models import User, Drink, Review, db
from flask_login import login_required, current_user
from app.forms.drink_form import DrinkForm
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages

drink_routes = Blueprint("drink", __name__)


# GET ALL DRINKS
@drink_routes.route("/")
def drinks():
    drinks = Drink.query.all()
    return {'drinks': [drink.to_dict() for drink in drinks]}

# GET SINGLE DRINK BY ID
@drink_routes.route("/<int:id>")
def drink(id):
    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404
    return drink.to_dict()

# CREATE A NEW DRINK
@drink_routes.route("/", methods=["POST"])
@login_required
def new_drink():
    form = DrinkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        drink = Drink(
            name=form.data["name"],
            abv=form.data["abv"],
            ibu=form.data["ibu"],
            description=form.data["description"],
            drink_img_url=form.data["drink_img_url"],
            user_id = current_user.id
        )
        db.session.add(drink)
        db.session.commit()
        return drink.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# EDIT A DRINK
@drink_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_drink(id):
    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404
    owner = drink.user_id
    if current_user.id == owner:
        form = DrinkForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            drink.name = form.data["name"]
            drink.abv = form.data["abv"]
            drink.ibu = form.data["ibu"]
            drink.description = form.data["description"]
            drink.drink_img_url = form.data["drink_img_url"]
            db.session.commit()
            return drink.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

# DELETE A DRINK
@drink_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_drink(id):
    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404
    owner = drink.user_id
    if current_user.id == owner:
        db.session.delete(drink)
        db.session.commit()
        return {"message": "Drink successfully deleted"}
    return {'errors': ['Unauthorized']}

# A logged in user can create a checkin/review for a drink.
@drink_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def createAReview(id):
    form = ReviewForm()
    drink_id = id
    form['csrf_token'].data = request.cookies['csrf_token']

    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404

    # review = Review.query.filter(Review.drink_id == id, Review.user_id == current_user.id).first()
    # if review:
    #     return {'errors': "User already has a review for this drink"}, 403

    if form.validate_on_submit():
        review = Review(
            content= form.data["content"],
            stars= form.data["stars"],
            user_id= current_user.id,
            drink_id= drink_id,
            review_img_url= form.data["review_img_url"]
        )
        db.session.add(review)
        db.session.commit()

        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# View all reviews for a drink
@drink_routes.route('/<int:id>/reviews', methods=["GET"])
def getAllReviewsForADrink(id):
    reviews = Review.query.filter(Review.drink_id == id).all()
    if not reviews:
        return {'errors': "Review could not be found"}, 404
    return {'reviews': [review.to_dict() for review in reviews]}
