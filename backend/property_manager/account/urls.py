from django.urls import path
from .views import (
    RegisterView,
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    ProfileView,
    LogoutView,
)

urlpatterns = [
    path("account/register", RegisterView.as_view(), name="register"),
    path("auth/login", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("profile", ProfileView.as_view(), name="profile"),
    path("auth/refresh", CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("auth/logout", LogoutView.as_view(), name="logout"),
]
