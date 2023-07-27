from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    drink_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('drinks.id')), nullable=False)
    review_img_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now(), nullable=False)

    user = db.relationship('User', back_populates='user_reviews')
    drink = db.relationship('Drink', back_populates='drink_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'stars': self.stars,
            'user_id': self.user_id,
            'drink_id': self.drink_id,
            'review_img_url': self.review_img_url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
