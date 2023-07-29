from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        first_name='User',
        last_name='One',
        birthday=date(1990, 1, 1),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        first_name='User',
        last_name='Two',
        birthday=date(1990, 1, 2),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        first_name='User',
        last_name='Three',
        birthday=date(1990, 1, 3),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    user4 = User(
        username='user4',
        email='user4@example.com',
        password='password',
        first_name='User',
        last_name='Four',
        birthday=date(1990, 1, 4),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    user5 = User(
        username='user5',
        email='user5@example.com',
        password='password',
        first_name='User',
        last_name='Five',
        birthday=date(1990, 1, 5),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    user6 = User(
        username='user6',
        email='user6@example.com',
        password='password',
        first_name='User',
        last_name='Six',
        birthday=date(1990, 1, 6),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    user7 = User(
        username='user7',
        email='user7@example.com',
        password='password',
        first_name='User',
        last_name='Seven',
        birthday=date(1990, 1, 7),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    user8 = User(
        username='user8',
        email='user8@example.com',
        password='password',
        first_name='User',
        last_name='Eight',
        birthday=date(1990, 1, 8),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    user9 = User(
        username='user9',
        email='user9@example.com',
        password='password',
        first_name='User',
        last_name='Nine',
        birthday=date(1990, 1, 9),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    user10 = User(
        username='user10',
        email='user10@example.com',
        password='password',
        first_name='User',
        last_name='Ten',
        birthday=date(1990, 1, 10),
        user_img_url='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png',
    )

    # Add more users here as needed

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()