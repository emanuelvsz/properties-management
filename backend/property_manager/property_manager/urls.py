from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("property/", include("property.urls")),
    path("tenant/", include("tenant.urls")),
    path("rent_contract/", include("rent_contract.urls")),
    path("rent_payment/", include("rent_payment.urls")),
    path("expense/", include("expense.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Interface do Swagger
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    # Interface alternativa (Redoc)
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
