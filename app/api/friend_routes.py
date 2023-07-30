from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user
from app.models import Friend, db, User

friend_routes = Blueprint("friends", __name__)

# A logged-in user can add a friend.
@friend_routes.route("/request/<int:targetId>", methods=["POST"])
@login_required
def addFriend(targetId):
    target_exists = User.query.all().filter(User.id == targetId)
    if not target_exists:
        return {'errors': "Friend could not be found"}, 404
    
    user_id = current_user.id
    new_request = Friend(
        user_id=user_id,
        friend_id=targetId,
        status="pending"
    )
    db.session.add(new_request)
    db.session.commit()
    return {"message": "Friend request sent"}

# A logged-in user can accept a friend request.
@friend_routes.route("/accept/<int:targetId>", methods=["PUT"])
@login_required
def acceptFriend(targetId):
    user_id = current_user.id
    friend_id = targetId
    request = Friend.query.get((friend_id, user_id))

    # Check if the friendship request exists
    if not request:
        return {'errors': "Friend request could not be found"}, 404

    request.status = "friends"
    db.session.commit()
    return {"message": "Request accepted"}

# A logged-in user can reject a friend request.
@friend_routes.route("/reject/<int:targetId>", methods=["DELETE"])
@login_required
def rejectFriend(targetId):
    user_id = current_user.id
    friend_id = targetId
    request = Friend.query.get((friend_id, user_id))

    # Check if the friendship request exists
    if not request:
        return {'errors': "Friend request could not be found"}, 404

    db.session.delete(request)
    db.session.commit()
    return {"message": "Request rejected"}

# A logged-in user can delete a friend.
@friend_routes.route("/remove/<int:targetId>", methods=["DELETE"])
@login_required
def deleteFriend(targetId):
    user_id = current_user.id
    friend_id = targetId
    friendship = Friend.query.get((user_id, friend_id))

    # Check if the friendship exists
    if not friendship:
        return {'errors': "Friend could not be found"}, 404

    db.session.delete(friendship)
    db.session.commit()
    return {"message": "Friend removed"}
