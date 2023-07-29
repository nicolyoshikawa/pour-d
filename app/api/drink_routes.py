from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required
from app.models import User, Drink

bp = Blueprint("drinks", __name__, url_prefix="/drinks")

# Users can view all drinks.
@bp.route("/", methods=["GET"])
def getAllDrinks():
    drinks = Drink.query.all()
    pass

# Users can read a specific drink's information.
@bp.route('/<int:id>', methods=["GET"])
def getDrink(id):
    drink = Drink.query.get(id)
    return drink.to_dict()

# Logged in users can create a drink with ABV, IBU, description, and image.
@bp.route('/', methods=["POST"])
@login_required
def createADrink():
    pass

# Logged in users can update a drink if they own it.
@bp.route('/<int:id>', methods=["PUT"])
@login_required
def updateDrink(id):
    pass

# Logged in users can delete a drink if they own it.
@bp.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteDrink(id):
    pass

# A logged in user can create a checkin/review for a drink.
@bp.route('/<int:id>/reviews', methods=["POST"])
@login_required
def createAReview():
    pass

# Users can read a checkin/review for a drink.
@bp.route('/<int:id>/reviews/<int:id>', methods=["GET"])
def getAReviewForADrink():
    pass
