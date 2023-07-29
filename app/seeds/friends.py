from app.models import db, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_friends():  
    user1 = User.query.get(1) # UserId
    user2 = User.query.get(2) # UserId
    user3 = User.query.get(3) # UserId

    # User1 is friends w/ User2
    user1.friends.append(user2, status="friends")
    # User1 has pending friend req to User3
    user1.friends.append(user3, status="pending")
    # User2 has pending friend req to User3
    user2.friends.append(user3, status="pending")

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.commit()

def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
