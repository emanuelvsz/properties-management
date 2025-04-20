from django.urls import path
from dashboard.views import ReturnsSummaryView

urlpatterns = [
    path(
        "dashboard/returns/summary",
        ReturnsSummaryView.as_view(),
        name="returns-summary",
    ),
]
