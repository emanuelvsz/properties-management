from django.urls import path
from expense.views import ExpenseDetailView, ExpenseListCreateView


urlpatterns = [
    path("expenses", ExpenseListCreateView.as_view(), name="expense-list"),
    path(
        "expenses/<int:id>",
        ExpenseDetailView.as_view(),
        name="expenses-detail",
    ),
]
