from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser
from .models import RefreshToken
from datetime import datetime, timedelta
import jwt
from django.conf import settings

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                data['user'] = user
                return data
            else:
                raise serializers.ValidationError("Invalid credentials")
        else:
            raise serializers.ValidationError("Must include username and password")

class RefreshTokenSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate_refresh_token(self, value):
        try:
            payload = jwt.decode(value, settings.SECRET_KEY, algorithms=['HS256'])
            return value
        except jwt.ExpiredSignatureError:
            raise serializers.ValidationError("Token has expired")
        except jwt.InvalidTokenError:
            raise serializers.ValidationError("Invalid token")
