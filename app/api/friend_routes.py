from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user
from app.models import Friend, db

friend_routes = Blueprint("friends", __name__)

# A logged in user can add a friend.
@friend_routes.route("/request/<int:targetId>", methods=["POST"])
@login_required
def addFriend(targetId):
    user = current_user.id
    new_req = Friend(
        user_id=user,
        friend_id=targetId,
        status="pending"
    )
    db.session.add(new_req)
    db.session.commit()
    return {"message": "Friend request sent"}

# A logged in user can accept a friend request.
@friend_routes.route("/accept/<int:requestId>", methods=["PUT"])
@login_required
def acceptFriend(requestId):
    request = Friend.query.get(requestId)
    request.status = "friends"
    db.session.commit()
    return {"message": "Request accepted"}

# A logged in user can reject a friend request.
@friend_routes.route("/reject/<int:requestId>", methods=["DELETE"])
@login_required
def rejectFriend(requestId):
    request = Friend.query.get(requestId)
    db.session.delete(request)
    db.session.commit()
    return {"message": "Request rejected"}

# A logged in user can delete a friend.
@friend_routes.route("/remove/<int:targetId>", methods=["DELETE"])
@login_required
def deleteFriend(targetId):
    user = current_user.id
    friend = Friend.query.all().filter(Friend.user_id == user and Friend.friend_id == targetId)
    db.session.delete(friend)
    db.session.commit()
    return {"message": "Friend removed"}