from django.urls import path
from .views import (
    login_view,
    logout_view,
    refresh_token_view,
    profile_view,
)

urlpatterns = [
    path("auth/login", login_view, name="login"),
    path("auth/logout", logout_view, name="logout"),
    path("auth/refresh-token", refresh_token_view, name="refresh_token"),
    path("profile", profile_view, name="profile"),
]
