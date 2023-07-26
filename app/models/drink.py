from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func

class Drink(db.Model):
    __tablename__ = 'drinks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    abv = db.Column(db.Integer, nullable=False)
    ibu = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    drinkImgUrl = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedAt = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    user = db.relationship('User', back_populates='drinks')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'abv': self.abv,
            'ibu': self.ibu,
            'description': self.description,
            'drinkImgUrl': self.drinkImgUrl,
            'createdAt': self.createdAt.isoformat(),
            'updatedAt': self.updatedAt.isoformat()
        }
