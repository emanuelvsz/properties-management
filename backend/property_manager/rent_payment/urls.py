from django.urls import path
from rent_payment.views import RentPaymentListCreateView, RentPaymentDetailView

urlpatterns = [
    path(
        "rent-payments", RentPaymentListCreateView.as_view(), name="rent-payment-list"
    ),
    path(
        "rent-payments/<int:id>",
        RentPaymentDetailView.as_view(),
        name="rent-payment-detail",
    ),
]
