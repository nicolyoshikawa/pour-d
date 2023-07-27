from app.models import db, environment, SCHEMA, Drink
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_drinks():
    big_wave = Drink(
        user_id=1,
        abv=4,
        ibu=21,
        description="Big Wave has a lighter body and bright hop aroma.",
        drink_img_url="https://cdn.shoplightspeed.com/shops/609238/files/3024211/kona-brewing-co-big-wave-golden-ale-abv-44-6-pack.jpg")
    longboard = Drink(
        user_id=1,
        abv=4,
        ibu=34,
        description="",
        drink_img_url="https://www.lukasliquorsuperstore.com/wp-content/uploads/2020/02/48000.jpg")
    kona_light = Drink(
        user_id=1,
        abv=4,
        ibu=19,
        description="Kona light is a crisp, 99-calorie beer",
        drink_img_url="https://www.liquorlockermd.com/images/sites/liquorlockermd/labels/w55705665o_1.jpg")

    db.session.add(big_wave)
    db.session.add(longboard)
    db.session.add(kona_light)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_drinks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM drinks"))

    db.session.commit()
