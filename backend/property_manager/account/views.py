from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import CustomUser, RefreshToken as RefreshTokenModel
from .serializers import LoginSerializer, RefreshTokenSerializer
from datetime import datetime, timedelta
import jwt
from django.conf import settings

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        
        refresh_token_expires_at = datetime.now() + timedelta(days=2)
        
        try:
            RefreshTokenModel.objects.create(
                user=user,
                token=refresh_token,
                expires_at=refresh_token_expires_at
            )
            
            return Response({
                'access': access_token,
                'refresh': refresh_token,
                'refresh_token': refresh_token,
                'refresh_token_expires_at': refresh_token_expires_at.isoformat()
            })
        except Exception as e:
            return Response({
                'access': access_token,
                'refresh': refresh_token
            })
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_active': user.is_active,
        'date_joined': user.date_joined.isoformat() if user.date_joined else None,
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            RefreshTokenModel.objects.filter(token=refresh_token).update(is_active=False)
        return Response({'message': 'Successfully logged out'})
    except Exception as e:
        return Response({'message': 'Logout successful'})

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token_view(request):
    serializer = RefreshTokenSerializer(data=request.data)
    if serializer.is_valid():
        refresh_token = serializer.validated_data['refresh_token']
        
        try:
            payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('user_id')
            
            if not user_id:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                refresh_token_obj = RefreshTokenModel.objects.get(
                    token=refresh_token,
                    is_active=True,
                    expires_at__gt=datetime.now()
                )
            except RefreshTokenModel.DoesNotExist:
                return Response({'error': 'Token expired or invalid'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = CustomUser.objects.get(id=user_id)
            
            new_refresh = RefreshToken.for_user(user)
            new_access_token = str(new_refresh.access_token)
            new_refresh_token = str(new_refresh)
            
            new_refresh_token_expires_at = datetime.now() + timedelta(days=2)
            
            refresh_token_obj.is_active = False
            refresh_token_obj.save()
            
            RefreshTokenModel.objects.create(
                user=user,
                token=new_refresh_token,
                expires_at=new_refresh_token_expires_at
            )
            
            return Response({
                'access': new_access_token,
                'refresh_token': new_refresh_token,
                'refresh_token_expires_at': new_refresh_token_expires_at.isoformat()
            })
            
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Token has expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
