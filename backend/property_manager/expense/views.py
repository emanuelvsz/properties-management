from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from expense.service.expense import ExpenseService


class ExpenseListView(APIView):
    """
    API endpoint to list all expenses or create a new one.

    - `GET /expenses/` → Returns all expenses.
    - `POST /expenses/` → Creates a new expense.
    """

    def get(self, _):
        expenses = ExpenseService.list_expenses()
        return Response(expenses.values(), status=status.HTTP_200_OK)

    def post(self, request):
        expense = ExpenseService.create_expense(request.data)
        return Response(expense.id, status=status.HTTP_201_CREATED)


class ExpenseDetailView(APIView):
    """
    API endpoint to retrieve, update (full/partial), or delete an expense by ID.

    - `GET /expenses/{id}/` → Returns details of a specific expense.
    - `PATCH /expenses/{id}/` → Partially updates an expense.
    - `PUT /expenses/{id}/` → Fully updates an expense.
    - `DELETE /expenses/{id}/` → Deletes an expense.
    """

    def get(self, _, expense_id):
        expense = ExpenseService.get_expense_by_id(expense_id)
        return Response(
            {"id": expense.id, "amount": expense.amount}, status=status.HTTP_200_OK
        )

    def patch(self, request, expense_id):
        expense = ExpenseService.update_expense(expense_id, request.data, partial=True)
        return Response({"id": expense.id}, status=status.HTTP_200_OK)

    def put(self, request, expense_id):
        expense = ExpenseService.update_expense(expense_id, request.data, partial=False)
        return Response({"id": expense.id}, status=status.HTTP_200_OK)

    def delete(self, _, expense_id):
        message = ExpenseService.delete_expense(expense_id)
        return Response(message, status=status.HTTP_204_NO_CONTENT)
