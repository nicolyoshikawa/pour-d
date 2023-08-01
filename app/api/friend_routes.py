from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user
from app.models import Friend, db, User

friend_routes = Blueprint("friends", __name__)

@friend_routes.route("/request/<int:targetId>", methods=["POST"])
@login_required
def addFriend(targetId):
    """
    A logged-in user can add a friend.
    """
    if current_user.id == targetId:
        return {'errors': "Cannot add yourself as a friend"}, 400

    target_user = User.query.get(targetId)
    if not target_user:
        return {'errors': "Friend could not be found"}, 404

    request_exists = Friend.query.filter_by(friend_id=targetId,
                                     user_id=current_user.id).first()
    request_exists_otherway = Friend.query.filter_by(user_id=targetId,
                                     friend_id=current_user.id).first()
    if request_exists or request_exists_otherway:
        return {'errors': "Friend request already exists/already friends"}, 400

    new_request = Friend(
        user=current_user,
        friend=target_user,
        status="pending"
    )
    db.session.add(new_request)
    db.session.commit()
    return {"message": "Friend request sent"}

@friend_routes.route("/accept/<int:targetId>", methods=["PUT"])
@login_required
def acceptFriend(targetId):
    """
    A logged-in user can accept a friend request.
    """
    request = Friend.query.filter_by(user_id=targetId,
                                     friend_id=current_user.id,
                                     status="pending").first()

    # Check if the friendship request exists
    if not request:
        return {'errors': "Friend request could not be found"}, 404

    request.status = "friends"
    db.session.commit()
    return {"message": "Request accepted"}

@friend_routes.route("/reject/<int:targetId>", methods=["DELETE"])
@login_required
def rejectFriend(targetId):
    """
    A logged-in user can reject a friend request.
    """
    request = Friend.query.filter_by(user_id=targetId,
                                     friend_id=current_user.id,
                                     status="pending").first()

    # Check if the friendship request exists
    if not request:
        return {'errors': "Friend request could not be found"}, 404

    db.session.delete(request)
    db.session.commit()
    return {"message": "Request rejected"}

@friend_routes.route("/remove/<int:targetId>", methods=["DELETE"])
@login_required
def deleteFriend(targetId):
    """
    A logged-in user can delete a friend.
    """
    friendship = Friend.query.filter(
        (Friend.user_id == current_user.id) & (Friend.friend_id == targetId) |
        (Friend.user_id == targetId) & (Friend.friend_id == current_user.id)
    ).first()

    # Check if the friendship exists
    if not friendship:
        return {'errors': "Friend could not be found"}, 404

    db.session.delete(friendship)
    db.session.commit()
    return {"message": "Friend removed"}
