from expense.models import Expense, ExpenseType
from expense.serializers import ExpenseSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ValidationError
from django.http import JsonResponse


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
        expense = get_object_or_404(Expense, id=expense_id)
        expense.delete()
        return {"detail": "Expense deleted successfully"}

    @staticmethod
    def get_expense_types(user):
        expense_types = ExpenseType.objects.all().values("id", "name", "description")
        return JsonResponse(list(expense_types), safe=False)

    @staticmethod
    def create_expense_type(user, data):
        expense_type = ExpenseType.objects.create(
            name=data.get("name"), description=data.get("description", "")
        )
        return {
            "id": str(expense_type.id),
            "name": expense_type.name,
            "description": expense_type.description,
        }

    @staticmethod
    def update_expense_type_partial(expense_type_id, data):
        try:
            expense_type = ExpenseType.objects.get(id=expense_type_id)
        except ExpenseType.DoesNotExist:
            raise NotFound("Expense type not found.")

        if "name" in data:
            expense_type.name = data["name"]
        if "description" in data:
            expense_type.description = data["description"]

        expense_type.save()

        return {
            "id": str(expense_type.id),
            "name": expense_type.name,
            "description": expense_type.description,
        }
