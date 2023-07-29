from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required
from app.models import User

bp = Blueprint("friends", __name__, url_prefix="/friend")

# A logged in user can add a friend.
@bp.route("/request/targetId", methods=["POST"])
@login_required
def addFriend():
    pass

# A logged in user can accept a friend request.
@bp.route("/accept/targetId", methods=["PUT"])
@login_required
def acceptFriend():
    pass
# A logged in user can reject a friend request.
@bp.route("/reject/targetId", methods=["DELETE"])
@login_required
def rejectFriend():
    pass

# A logged in user can delete a friend.
@bp.route("/remove/targetId", methods=["DELETE"])
@login_required
def deleteFriend():
    pass
