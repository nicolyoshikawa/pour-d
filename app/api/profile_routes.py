from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user
from app.models import User, Drink, Review, Friend

profile_routes = Blueprint("profile", __name__)

@profile_routes.route("/session", methods=["GET"])
@login_required
def getCurrentUser():
    """
    Get the current user that is logged in.
    """
    user = User.query.get(current_user.id)
    return user.to_dict()

@profile_routes.route("/drinks", methods=["GET"])
@login_required
def getCurrentUserDrinks():
    """
    Logged in users can view the drinks they have created.
    """
    user_drinks = Drink.query.all()
    return [drink.to_dict() for drink in user_drinks if drink.user_id == current_user.id]

@profile_routes.route("/reviews", methods=["GET"])
@login_required
def getCurrentUserReviews():
    """
    Logged in users can view the reviews they have created.
    """
    user_reviews = Review.query.all()
    return [review.to_dict() for review in user_reviews if review.user_id == current_user.id]

@profile_routes.route("/pending", methods=["GET"])
@login_required
def getCurrentUserFriendRequests():
    """
    A logged in user can view pending friend request to accept/reject.
    """
    find_friends = Friend.query.all()
    return [request.to_dict() for request in find_friends if request.friend_id == current_user.id and request.status == "pending"]

@profile_routes.route("/friend-activity", methods=["GET"])
@login_required
def getCurrentUserFriendActivity():
    """
    A logged in user can view their friend's activity.
    """
    find_friends = Friend.query.all()
    all_friends = [request.to_dict() for request in find_friends if (request.friend_id == current_user.id or request.user_id == current_user.id) and request.status == "friends"]
    user_ids = [friend["user_id"] for friend in all_friends if friend["user_id"] != current_user.id]
    friend_ids = [friend["friend_id"] for friend in all_friends if friend["friend_id"] != current_user.id]
    ids = user_ids + friend_ids
    friend_reviews = Review.query.filter(Review.user_id.in_(ids)).order_by(Review.created_at.desc()).all()
    friends_reviews_data = [review.to_dict() for review in friend_reviews]
    return friends_reviews_data