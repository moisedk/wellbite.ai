
class User:
    def __init__(self, username, password, role):
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.role = role  # 'doctor' or 'patient'

    def to_dict(self):
        return {
            'username': self.username,
            'password': self.password,
            'role': self.role
        }