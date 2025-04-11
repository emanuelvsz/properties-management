from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from .serializers import AccountSerializer, LogoutSerializer
from .service import AccountService
from property_manager.utils import ACCOUNT_TAG_IDENTIFIER
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(APIView):

    @swagger_auto_schema(
        operation_summary="Create a new user account",
        request_body=AccountSerializer,
        responses={201: AccountSerializer()},
        tags=[ACCOUNT_TAG_IDENTIFIER],
    )
    def post(self, request):
        user = AccountService.create_user(request.data)
        serializer = AccountSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        operation_summary="Login with username and password",
        tags=[ACCOUNT_TAG_IDENTIFIER],
        request_body=TokenObtainPairSerializer,
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class CustomTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        operation_summary="Refresh JWT token",
        tags=[ACCOUNT_TAG_IDENTIFIER],
        request_body=TokenRefreshSerializer,
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Logout and blacklist refresh token",
        tags=[ACCOUNT_TAG_IDENTIFIER],
        request_body=LogoutSerializer,
        responses={205: "Token blacklisted"},
    )
    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        refresh_token = serializer.validated_data["refresh"]

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {"detail": "Token blacklisted"}, status=status.HTTP_205_RESET_CONTENT
            )
        except TokenError as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"detail": f"Unhandled error: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get authenticated user profile",
        tags=[ACCOUNT_TAG_IDENTIFIER],
        responses={200: AccountSerializer()},
    )
    def get(self, request):
        serializer = AccountSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
