from django.urls import path
from property.views import PropertyDetailView, PropertyListCreateView


urlpatterns = [
    path("properties", PropertyListCreateView.as_view(), name="property-list"),
    path(
        "properties/<uuid:id>",
        PropertyDetailView.as_view(),
        name="properties-detail",
    ),
]
