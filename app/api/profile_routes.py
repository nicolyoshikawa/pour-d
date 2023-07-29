from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required
from app.models import User

bp = Blueprint("profile", __name__, url_prefix="/currentUser")

# Get the current user that is logged in.
@bp.route("/session", methods=["GET"])
def getCurrentUser():
    pass

# Logged in users can view the drinks they have created.
@bp.route("/drinks", methods=["GET"])
@login_required
def getCurrentUserDrinks():
    pass

# Logged in users can view the reviews they have created.
@bp.route("/reviews", methods=["GET"])
@login_required
def getCurrentUserReviews():
    pass

# A logged in user can view pending friend request to accept/reject.
@bp.route("/pending", methods=["GET"])
@login_required
def getCurrentUserFriendRequests():
    pass

# A logged in user can view their friend's activity.
@bp.route("/friend-activity", methods=["GET"])
@login_required
def getCurrentUserFriendActivity():
    pass
