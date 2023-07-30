from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user
from app.models import User, Drink, Review, Friend

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
    user_drinks = Drink.query.all()
    return [drink.to_dict() for drink in user_drinks if drink.user_id == current_user.id]

# Logged in users can view the reviews they have created.
@profile_routes.route("/reviews", methods=["GET"])
@login_required
def getCurrentUserReviews():
    user_reviews = Review.query.all()
    return [review.to_dict() for review in user_reviews if review.user_id == current_user.id]

# A logged in user can view pending friend request to accept/reject.
@profile_routes.route("/pending", methods=["GET"])
@login_required
def getCurrentUserFriendRequests():
    find_friends = Friend.query.all()
    return [request.to_dict() for request in find_friends if request.friend_id == current_user.id and request.status == "pending"]

# A logged in user can view their friend's activity.
@profile_routes.route("/friend-activity", methods=["GET"])
@login_required
def getCurrentUserFriendActivity():
    find_friends = Friend.query.all()
    friend_list = [request.to_dict() for request in find_friends if (request.friend_id == current_user.id or request.user_id == current_user.id) and request.status == "friends"]
    return friend_list