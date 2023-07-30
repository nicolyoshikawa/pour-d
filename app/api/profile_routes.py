from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user
from app.models import User, Drink, Review

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
    user_drinks = Drink.query.all().filter(Drink.user_id == current_user.id)
    return user_drinks.to_dict()

# Logged in users can view the reviews they have created.
@profile_routes.route("/reviews", methods=["GET"])
@login_required
def getCurrentUserReviews():
    user_reviews = Review.query.all().filter(Review.user_id == current_user.id)
    return user_reviews.to_dict()

# A logged in user can view pending friend request to accept/reject.
@profile_routes.route("/pending", methods=["GET"])
@login_required
def getCurrentUserFriendRequests():
    user = User.query.get(current_user.id)
    pending = user.friends.query.all().filter(user.friends.status == "pending")
    return pending.to_dict()

# A logged in user can view their friend's activity.
@profile_routes.route("/friend-activity", methods=["GET"])
@login_required
def getCurrentUserFriendActivity():
    user = User.query.get(current_user.id)
    user_friends = user.friends.query.all().filter(user.friends.status == "friends")
    return user_friends.to_dict()
