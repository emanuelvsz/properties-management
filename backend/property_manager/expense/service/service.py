from expense.models import Expense
from expense.serializers import ExpenseSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from django.http import JsonResponse
from expense.models import ExpenseTypeEnum

class ExpenseService:
    @staticmethod
    def get_expenses():
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
        expense = Expense.objects.filter(id=expense_id).last()
        expense.delete()
        return {"detail": "Expense deleted successfully"}

    @staticmethod
    def get_expense_types(user):
        return JsonResponse([e.value for e in ExpenseTypeEnum], safe=False)
