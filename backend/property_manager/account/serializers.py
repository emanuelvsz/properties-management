from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "email", "username", "password", "confirm_password")

    def validate(self, data):
        try:
            print(data)  # Verifique os dados
            print("Jacquin")
            if data["password"] != data["confirm_password"]:
                print("hey")
                raise serializers.ValidationError("Passwords do not match.")
        except serializers.ValidationError as e:
            print(f"Validation error: {e}")
            raise e  # Relevante para capturar o erro para debugging
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = User.objects.create_user(**validated_data)
        return user


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
