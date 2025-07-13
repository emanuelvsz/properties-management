from django.urls import path
from .views.views import (
    InventoryListCreateView,
    InventoryDetailView,
    PropertyInventoryView,
    InventoryCategoriesView,
)

urlpatterns = [
    path("inventory/", InventoryListCreateView.as_view(), name="inventory-list-create"),
    path("inventory/<uuid:id>/", InventoryDetailView.as_view(), name="inventory-detail"),
    path("inventory/categories/", InventoryCategoriesView.as_view(), name="inventory-categories"),
    path("properties/<uuid:property_id>/inventory/", PropertyInventoryView.as_view(), name="property-inventory"),
] 