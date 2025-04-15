from property.views import (
    PropertyDetailView,
    PropertyListCreateView,
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
]
