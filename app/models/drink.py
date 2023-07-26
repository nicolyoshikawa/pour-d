from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Drink(db.Model):
    __tablename__ = 'drinks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    ABV = db.Column(db.Integer, nullable=False)
    IBU = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    drinkImgUrl = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'ABV': self.ABV,
            'IBU': self.IBU,
            'description': self.description,
            'drinkImgUrl': self.drinkImgUrl,
            'createdAt': self.createdAt.isoformat(),
            'updatedAt': self.updatedAt.isoformat()
        }
