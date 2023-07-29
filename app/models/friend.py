from app.models import db

class Friend(db.Model):
    __tablename__ = 'friends'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    status = db.Column(db.String(20), nullable=False, default='pending')

    user = db.relationship('User', foreign_keys=[user_id], back_populates='friends')
    friend = db.relationship('User', foreign_keys=[friend_id], back_populates='friend_of')
