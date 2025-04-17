from django.urls import path
from expense.views import (
    ExpenseDetailView,
    ExpenseListCreateView,
    ExpenseTypesView,
)


urlpatterns = [
    path("expenses", ExpenseListCreateView.as_view(), name="expense-list"),
    path(
        "expenses/<uuid:id>",
        ExpenseDetailView.as_view(),
        name="expenses-detail",
    ),
    path("expenses/types", ExpenseTypesView.as_view(), name="expenses-types"),
]
