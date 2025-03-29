from django.urls import path, include
from rest_framework.routers import DefaultRouter
from expense.views import ExpenseListView, ExpenseDetailView

router = DefaultRouter()

urlpatterns = [
    path("", ExpenseListView.as_view(), name="expense-list"),
    path("<int:expense_id>/", ExpenseDetailView.as_view(), name="expense-detail"),
]
