from flask import Blueprint, request
from app.models import User, Drink, Review, db
from flask_login import login_required, current_user
from app.forms.drink_form import DrinkForm
from app.forms.review_form import ReviewForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy.sql import func

drink_routes = Blueprint("drink", __name__)

@drink_routes.route('/<int:id>/reviews', methods=["GET"])
def getAllReviewsForADrink(id):
    """
    View all reviews for a drink
    """
    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404

    reviews = Review.query.filter(Review.drink_id == id).all()

    reviewsList = []
    for review in reviews:
        user = User.query.filter(User.id == review.user_id).first()
        reviewOwner = user.to_dict()
        reviewDict = review.to_dict()
        reviewDict["User"] = reviewOwner
        reviewsList.append(reviewDict)
    return {"reviews": reviewsList}

@drink_routes.route('/<int:id>/reviews', methods=["POST"])
@login_required
def createAReview(id):
    """
    A logged in user can create a checkin/review for a drink.
    """
    form = ReviewForm()
    drink_id = id
    form['csrf_token'].data = request.cookies['csrf_token']

    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404

    if drink.user_id == current_user.id:
        return {'errors': "Cannot create a review for a drink that you created"}, 400

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

@drink_routes.route("/<int:id>")
def drink(id):
    """
    GET SINGLE DRINK BY ID
    """
    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404

    reviewAvg = Review.query.with_entities(func.avg(Review.stars)).filter(Review.drink_id == drink.id).scalar()
    reviewCount = Review.query.filter(Review.drink_id == drink.id).count()
    drinkDict = drink.to_dict()
    drinkDict["review_avg"] = reviewAvg
    drinkDict["review_count"] = reviewCount
    return drinkDict
    # return drink.to_dict()

@drink_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_drink(id):
    """
    EDIT A DRINK
    """
    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404
    owner = drink.user_id
    if current_user.id == owner:
        form = DrinkForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        drink_name_exists = Drink.query.filter(Drink.name == form.data["name"], Drink.id != id).all()
        if drink_name_exists:
            return {'errors': "A drink with that name already exisits"}, 401
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

@drink_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_drink(id):
    """
    DELETE A DRINK
    """
    drink = Drink.query.get(id)
    if not drink:
        return {'errors': "Drink could not be found"}, 404
    owner = drink.user_id
    if current_user.id == owner:
        db.session.delete(drink)
        db.session.commit()
        return {"message": "Drink successfully deleted"}
    return {'errors': ['Unauthorized']}

@drink_routes.route("/")
def drinks():
    """
    GET ALL DRINKS
    """
    drinks = Drink.query.all()
    # return {'drinks': [drink.to_dict() for drink in drinks]}
    drinksList = []
    for drink in drinks:
        reviewAvg = Review.query.with_entities(func.avg(Review.stars)).filter(Review.drink_id == drink.id).scalar()
        reviewCount = Review.query.filter(Review.drink_id == drink.id).count()
        drinkDict = drink.to_dict()
        drinkDict["review_avg"] = reviewAvg
        drinkDict["review_count"] = reviewCount
        drinksList.append(drinkDict)
    return {"drinks": drinksList}

@drink_routes.route("/", methods=["POST"])
@login_required
def new_drink():
    """
    CREATE A NEW DRINK
    """
    form = DrinkForm()

    drink_name_exists = Drink.query.filter(Drink.name == form.data["name"]).all()
    if drink_name_exists:
        return {'errors': "A drink with that name already exisits"}, 401
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
