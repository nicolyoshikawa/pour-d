from app.models import db, environment, SCHEMA, User, Friend
from sqlalchemy.sql import text

def seed_friends():  
    user1 = User.query.get(1) # UserId
    user2 = User.query.get(2) # UserId
    user3 = User.query.get(3) # UserId

    # User1 is friends with User2
    friend1 = Friend(user=user1, friend=user2, status='friends')

    # User1 has pending friend request to User3
    friend2 = Friend(user=user1, friend=user3, status='pending')

    # User2 has pending friend request to User3
    friend3 = Friend(user=user2, friend=user3, status='pending')

    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
