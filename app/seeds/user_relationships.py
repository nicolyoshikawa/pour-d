from app.models import db, environment, SCHEMA, User
from sqlalchemy.sql import text

def seed_user_relationships():
    user_ids = [1, 2, 3] # Number of users
    
    user1 = User.query.get(user_ids[0])
    user2 = User.query.get(user_ids[1])
    user3 = User.query.get(user_ids[2])

    # User1 is friends w/ User2
    user1.friends.append(user2, status='friends')
    # User1 has pending friend req to User3
    user1.friends.append(user3, status='pending')
    # User2 has pending friend req to User3
    user2.friends.append(user3, status='pending')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.commit()

def undo_user_relationships():
    if environment == "production":
        db.session.execute('TRUNCATE friends RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
