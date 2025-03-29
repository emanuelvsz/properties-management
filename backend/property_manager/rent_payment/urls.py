from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RentPaymentViewSet

router = DefaultRouter()
router.register(r"", RentPaymentViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
