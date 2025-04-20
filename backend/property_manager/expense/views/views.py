from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from expense.service import ExpenseService
from expense.serializers import ExpenseSerializer
from property_manager.utils import EXPENSE_TAG_IDENTIFIER
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class ExpenseListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all user expenses",
        responses={200: ExpenseSerializer(many=True)},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def get(self, request):
        date_by = request.query_params.get("date_by", "month")
        q = request.query_params.get("q")
        payed = request.query_params.get("payed", None)
        order_by = request.query_params.get("order_by", "newest")
        if date_by not in ["week", "month", "year"]:
            return Response(
                {"detail": "date_by must be 'week', 'month', or 'year'."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            expenses = ExpenseService.get_expenses(
                request.user, date_by, q, payed, order_by
            )
            serializer = ExpenseSerializer(expenses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @swagger_auto_schema(
        operation_summary="Create a new expense for a property",
        request_body=ExpenseSerializer,
        responses={201: ExpenseSerializer()},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def post(self, request):
        expense = ExpenseService.create_expense(request.data)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ExpenseDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve an expense by ID",
        responses={200: ExpenseSerializer()},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def get(self, _, id):
        expense = ExpenseService.get_expense_by_id(id)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Partially update an expense",
        request_body=ExpenseSerializer,
        responses={200: ExpenseSerializer()},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def patch(self, request, id):
        expense = ExpenseService.update_expense(id, request.data, partial=True)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Completely update an expense",
        request_body=ExpenseSerializer,
        responses={200: ExpenseSerializer()},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def put(self, request, id):
        expense = ExpenseService.update_expense(id, request.data, partial=False)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Delete an expense",
        responses={204: "No Content"},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def delete(self, _, id):
        message = ExpenseService.delete_expense(id)
        return Response(message, status=status.HTTP_204_NO_CONTENT)


class ExpenseTypesView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all expenses types",
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def get(self, request):
        return ExpenseService.get_expense_types(request.user)
