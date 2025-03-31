from django.urls import path
from rent_contract.views import RentContractDetailView, RentContractListCreateView


urlpatterns = [
    path(
        "rent_contract", RentContractListCreateView.as_view(), name="rent-contract-list"
    ),
    path(
        "rent_contract/<int:id>",
        RentContractDetailView.as_view(),
        name="rent-contracts-detail",
    ),
]
