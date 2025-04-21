from django.urls import path
from tenant.views import TenantListCreateView, TenantDetailView

urlpatterns = [
    path("tenants", TenantListCreateView.as_view(), name="tenant-list"),
    path(
        "tenants/<uuid:pk>",
        TenantDetailView.as_view(),
        name="tenant-detail",
    ),
]
