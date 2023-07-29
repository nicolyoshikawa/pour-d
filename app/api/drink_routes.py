
from flask import Blueprint
from app.models import User, Drink, db
from flask_login import login_required, current_user
from app.forms.drink_form import DrinkForm
from .auth_routes import validation_errors_to_error_messages

drink_routes = Blueprint("drink", __name__)

@drink_routes.route("/")

# GET ALL DRINKS
def drinks():
    drinks = Drink.query.all()
    return {'drinks': [drink.to_dict() for drink in drinks]}

@drink_routes.route("/<int:id>")

# GET SINGLE DRINK BY ID
def drink(id):
    drink = Drink.query.get(id)
    return drink.to_dict()

@drink_routes.route("/", methods=["POST"])
@login_required

# CREATE A NEW DRINK
def new_drink():
    form = DrinkForm()
    if form.validate_on_submit():
        drink = Drink(
            abv=form.data["abv"],
            ibu=form.data["ibu"],
            description=form.data["description"],
            drink_image_url=form.data["logo"]
        )
        db.session.add(drink)
        db.session.commit()
        return drink.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@drink_routes.route("/", methods=["PUT"])
@login_required

# EDIT A DRINK
def edit_drink(id):
    drink = Drink.query.get(id)
    owner = drink.user_id
    if current_user.id == owner:
        form = DrinkForm()
        if form.validate_on_submit():
            drink.abv = form.data["abv"],
            drink.ibu = form.data["ibu"],
            drink.description = form.data["description"],
            drink.drink_image_url = form.data["logo"]
            db.session.commit()
            return drink.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return {'errors': ['Unauthorized']}

@drink_routes.route("/", methods=["DELETE"])
@login_required

# DELETE A DRINK
def delete_drink(id):
    drink = Drink.query.get(id)
    owner = drink.user_id
    if current_user.id == owner:
        db.session.delete(drink)
        db.session.commit()
        return {"message": "Drink successfully deleted"}
    return {'errors': ['Unauthorized']}

# A logged in user can create a checkin/review for a drink.
@bp.route('/<int:id>/reviews', methods=["POST"])
@login_required
def createAReview():
    pass

# Users can read a checkin/review for a drink.
@bp.route('/<int:id>/reviews/<int:id>', methods=["GET"])
def getAReviewForADrink():
    pass

