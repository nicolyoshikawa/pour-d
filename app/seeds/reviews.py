from app.models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text
import random

def seed_reviews():
    user_ids = [1, 2, 3] # Number of users
    drink_ids = list(range(1, 15))  # Number of drinks + 1
    review_contents = [
        "Wouldn't recommend it.",
        "Not my favorite.",
        "I didn't like the taste.",
        "Not bad, but could be better.",
        "Too bitter for my liking.",
        "A bit too sweet for me.",
        "It's okay, nothing special.",
        "This is a classic.",
        "Great balance of flavors.",
        "Smooth and refreshing!",
        "This drink is amazing!",
        "The taste is fantastic.",
        "Best drink I've ever had!",
    ]

    for _ in range(50):  # Number of reviews
        review = Review(
            content=random.choice(review_contents),
            stars=random.randint(1, 5),
            user_id=random.choice(user_ids),
            drink_id=random.choice(drink_ids),
            review_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'
        )
        db.session.add(review)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
