from property.views import (
    PropertyDetailView,
    PropertyListCreateView,
    PropertyContractsView,
    PropertyExpensesView,
)

from django.urls import path


urlpatterns = [
    path("properties", PropertyListCreateView.as_view(), name="property-list"),
    path(
        "properties/<uuid:id>",
        PropertyDetailView.as_view(),
        name="properties-detail",
    ),
    path(
        "properties/<uuid:id>/expenses",
        PropertyExpensesView.as_view(),
        name="property-expenses",
    ),
    path(
        "properties/<uuid:id>/contracts",
        PropertyContractsView.as_view(),
        name="property-contracts",
    ),
]
