from app.models import db, environment, SCHEMA, Drink
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_drinks():
    big_wave = Drink(
        user_id=1,
        abv=4,
        ibu=21,
        description="Big Wave has a lighter body and bright hop aroma.",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-9657_de8d4_hd.jpeg")
    longboard = Drink(
        user_id=1,
        abv=4,
        ibu=20,
        description="Longboard has a delicate, slightly spicy hop aroma.",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-13560_4b48e_hd.jpeg")
    kona_light = Drink(
        user_id=1,
        abv=4,
        ibu=20,
        description="Kona light is a crisp, 99-calorie beer.",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-3527365_8c8a2_hd.jpeg")
    fire_rock_pale_ale = Drink(
        user_id=1,
        abv=5,
        ibu=35,
        description="A Hawaiian-style pale ale, with citrus-floral hop aroma.",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-8843_fb933_hd.jpeg")
    castaway_ipa = Drink(
        user_id=1,
        abv=6,
        ibu=50,
        description="A full-bodied IPA, with assertive hop flavor.",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-24589_c9aa6_hd.jpeg")

    corona_premier = Drink(
        user_id=2,
        abv=4,
        ibu=7,
        description="Smooth and drinkable light lager beer - mild, malty taste",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-1967561_60cca_hd.jpeg")
    corona_light = Drink(
        user_id=2,
        abv=4,
        ibu=18,
        description="distinctive hop flavor and pleasant fruity-honey aroma",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-5849_7d405_hd.jpeg")
    corona_extra = Drink(
        user_id=2,
        abv=4,
        ibu=18,
        description="crisp, clean, well balanced cerveza",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-5848_51047_hd.jpeg")
    corona_familiar = Drink(
        user_id=2,
        abv=4,
        ibu=32,
        description="fuller flavor, higher ABV",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-1693876_35018_hd.jpeg")

    stone_ipa = Drink(
        user_id=3,
        abv=6,
        ibu=71,
        description="hoppier and higher in ABV",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-821_5680e_hd.jpeg")
    stone_delicious_ipa = Drink(
        user_id=3,
        abv=7,
        ibu=75,
        description="intensely citrusy and beautifully bitter",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-392748_a046a_hd.jpeg")
    stone_tangerine_express_hazy_ipa = Drink(
        user_id=3,
        abv=6,
        ibu=75,
        description="made with tangerine puree",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-1512388_94205_hd.jpeg")
    stone_ripper = Drink(
        user_id=3,
        abv=5,
        ibu=40,
        description="inspired by coastal surf cultures",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-1652170_3c64b_hd.jpeg")
    stone_25th_anniversary_triple_ipa = Drink(
        user_id=3,
        abv=12,
        ibu=100,
        description="25 years in the making",
        drink_img_url="https://assets.untappd.com/site/beer_logos_hd/beer-4444078_cad7e_hd.jpeg")

    db.session.add(big_wave)
    db.session.add(longboard)
    db.session.add(kona_light)
    db.session.add(fire_rock_pale_ale)
    db.session.add(castaway_ipa)

    db.session.add(corona_premier)
    db.session.add(corona_light)
    db.session.add(corona_extra)
    db.session.add(corona_familiar)

    db.session.add(stone_ipa)
    db.session.add(stone_delicious_ipa)
    db.session.add(stone_tangerine_express_hazy_ipa)
    db.session.add(stone_ripper)
    db.session.add(stone_25th_anniversary_triple_ipa)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_drinks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.drinks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM drinks"))

    db.session.commit()
