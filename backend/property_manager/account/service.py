from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

User = get_user_model()

class AccountService:
    @staticmethod
    def create_user(data):
        if data.get("password") != data.get("confirm_password"):
            raise ValidationError("Passwords do not match.")
        data.pop("confirm_password")
        return User.objects.create_user(**data)
