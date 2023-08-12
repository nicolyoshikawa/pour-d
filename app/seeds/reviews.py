from app.models import db, environment, SCHEMA, Review
from sqlalchemy.sql import text
import random

def seed_reviews():
    user_ids = list(range(1, 11))  # Number of users (1 to 10)
    drink_ids = list(range(1, 15))  # Number of drinks (1 to 14)
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

    user_reviews = {}  # A dictionary to keep track of user reviews

    for user_id in user_ids:
        drinks_sample = random.sample(drink_ids, k=random.randint(1, len(drink_ids)))
        for drink_id in drinks_sample:
            if user_id not in user_reviews:
                user_reviews[user_id] = set()

            if drink_id not in user_reviews[user_id]:
                review = Review(
                    content=random.choice(review_contents),
                    stars=random.randint(1, 5),
                    user_id=user_id,
                    drink_id=drink_id,
                    review_img_url='https://www.kark.com/wp-content/uploads/sites/85/2022/12/GettyImages-1300799299-1.jpg'
                )
                db.session.add(review)
                user_reviews[user_id].add(drink_id)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.drinks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
