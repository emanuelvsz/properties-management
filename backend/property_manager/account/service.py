from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

User = get_user_model()

class AccountService:
    @staticmethod
    def create_user(data):
        if data.get("password") != data.get("password2"):
            raise ValidationError("Passwords do not match.")
        data.pop("password2")
        return User.objects.create_user(**data)
