from flask_login import UserMixin

class User(UserMixin):
    def __main__(self, username, password):
        self.id = username  # Assuming username is unique
        self.password = password  # Store hashed password securely (see later)