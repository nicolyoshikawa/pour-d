from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Drink(db.Model):
    __tablename__ = 'drinks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    abv = db.Column(db.Integer, nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    drink_img_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    user = db.relationship('User', back_populates='drinks')
    drink_reviews = db.relationship('Review', back_populates='drink', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name' : self.name,
            'user_id': self.user_id,
            'abv': self.abv,
            'ibu': self.ibu,
            'description': self.description,
            'drink_img_url': self.drink_img_url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
