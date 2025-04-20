from expense.models import Expense
from expense.serializers import ExpenseSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from django.http import JsonResponse
from expense.models import ExpenseTypeEnum
from django.db.models import Sum, Q
from django.db.models.functions import TruncWeek, TruncMonth, TruncYear


class ExpenseService:
    @staticmethod
    def get_expenses(user, date_by, q=None, payed=None, order_by=None):
        """
        Get property expenses and classify them by type, summing expense values.

        :param user: The authenticated user.
        :param property_id: The unique identifier of the property.
        :param date_by: The date interval for grouping ('week', 'month', 'year').
        :param q: Optional search query for filtering expenses by name or description.
        :param payed: Optional boolean to filter by payment status.
        :param order_by: Optional ordering ('newest', 'oldest', 'highest_value', 'lowest_value', 'due_soon', 'due_late').
        :return: A filtered and ordered queryset of expenses.
        """
        queryset = Expense.objects.filter(property__user=user)

        if q:
            queryset = queryset.filter(
                Q(name__icontains=q) | Q(description__icontains=q)
            )

        if payed is not None:
            if str(payed).lower() == "true":
                queryset = queryset.filter(payed_at__isnull=False)
            elif str(payed).lower() == "false":
                queryset = queryset.filter(payed_at__isnull=True)

        if order_by:
            if order_by == "newest":
                queryset = queryset.order_by("-created_at")
            elif order_by == "oldest":
                queryset = queryset.order_by("created_at")
            elif order_by == "highest_value":
                queryset = queryset.order_by("-expense_value")
            elif order_by == "lowest_value":
                queryset = queryset.order_by("expense_value")
            elif order_by == "due_soon":
                queryset = queryset.order_by("due_date")
            elif order_by == "due_late":
                queryset = queryset.order_by("-due_date")
        else:
            queryset = queryset.order_by("-id")

        if date_by == "week":
            queryset = queryset.annotate(period=TruncWeek("created_at"))
        elif date_by == "month":
            queryset = queryset.annotate(period=TruncMonth("created_at"))
        elif date_by == "year":
            queryset = queryset.annotate(period=TruncYear("created_at"))
        else:
            raise ValueError(
                "Invalid date_by parameter. Use 'week', 'month', or 'year'."
            )

        return queryset

    @staticmethod
    def get_expense_by_id(expense_id):
        return get_object_or_404(Expense, id=expense_id)

    @staticmethod
    def create_expense(data):
        serializer = ExpenseSerializer(data=data)
        if serializer.is_valid():
            return serializer.save()
        raise ValidationError(serializer.errors)

    @staticmethod
    def update_expense(expense_id, data, partial=False):
        expense = get_object_or_404(Expense, id=expense_id)
        serializer = ExpenseSerializer(expense, data=data, partial=partial)
        if serializer.is_valid():
            return serializer.save()
        raise ValidationError(serializer.errors)

    @staticmethod
    def delete_expense(expense_id):
        expense = Expense.objects.filter(id=expense_id).last()
        expense.delete()
        return {"detail": "Expense deleted successfully"}

    @staticmethod
    def get_expense_types(user):
        return JsonResponse([e.value for e in ExpenseTypeEnum], safe=False)
