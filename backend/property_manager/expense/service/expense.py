from expense.models import Expense
from expense.serializers import ExpenseSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError


class ExpenseService:
    @staticmethod
    def list_expenses():
        return Expense.objects.all()

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
        expense = get_object_or_404(Expense, id=expense_id)
        expense.delete()
        return {"detail": "Expense deleted successfully"}
