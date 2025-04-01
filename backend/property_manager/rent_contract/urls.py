from django.urls import path
from rent_contract.views import RentContractDetailView, RentContractListCreateView


urlpatterns = [
    path(
        "rent-contract", RentContractListCreateView.as_view(), name="rent-contract-list"
    ),
    path(
        "rent-contract/<int:id>",
        RentContractDetailView.as_view(),
        name="rent-contracts-detail",
    ),
]
