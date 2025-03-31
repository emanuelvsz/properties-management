from django.contrib import admin
from rest_framework import permissions
from django.urls import path, include

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Property Manager",
        default_version="v1",
        description="This is a rented properties manager",
        contact=openapi.Contact(email="emanuelvilela.dev@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("property.urls")),
    path("", include("tenant.urls")),
    path("", include("rent_contract.urls")),
    path("", include("rent_payment.urls")),
    path("", include("expense.urls")),
    path(
        "api/docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path(
        "api/redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
