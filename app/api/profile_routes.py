from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user
from app.models import User, Drink

profile_routes = Blueprint("profile", __name__)

# Get the current user that is logged in.
@profile_routes.route("/session", methods=["GET"])
@login_required
def getCurrentUser():
    user = User.query.get(current_user.id)
    return user.to_dict()

# Logged in users can view the drinks they have created.
@profile_routes.route("/drinks", methods=["GET"])
@login_required
def getCurrentUserDrinks():
    user_drinks = Drink.query.all().filter(Drink.user_id == 1)
    return user_drinks.to_dict()

# Logged in users can view the reviews they have created.
@profile_routes.route("/reviews", methods=["GET"])
@login_required
def getCurrentUserReviews():
    pass

# A logged in user can view pending friend request to accept/reject.
@profile_routes.route("/pending", methods=["GET"])
@login_required
def getCurrentUserFriendRequests():
    pass

# A logged in user can view their friend's activity.
@profile_routes.route("/friend-activity", methods=["GET"])
@login_required
def getCurrentUserFriendActivity():
    pass
