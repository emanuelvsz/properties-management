from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from expense.service import ExpenseService
from expense.serializers import ExpenseSerializer, ExpenseTypeSerializer
from property_manager.utils import EXPENSE_TAG_IDENTIFIER
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class ExpenseListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all expenses",
        responses={200: ExpenseSerializer(many=True)},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def get(self, _):
        expenses = ExpenseService.get_expenses()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
    @swagger_auto_schema(
        operation_summary="Retrieve an expense by ID",
        responses={200: ExpenseSerializer()},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def get(self, _, pk):
        expense = ExpenseService.get_expense_by_id(pk)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Partially update an expense",
        request_body=ExpenseSerializer,
        responses={200: ExpenseSerializer()},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def patch(self, request, pk):
        expense = ExpenseService.update_expense(pk, request.data, partial=True)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Completely update an expense",
        request_body=ExpenseSerializer,
        responses={200: ExpenseSerializer()},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def put(self, request, pk):
        expense = ExpenseService.update_expense(pk, request.data, partial=False)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Delete an expense",
        responses={204: "No Content"},
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def delete(self, _, pk):
        message = ExpenseService.delete_expense(pk)
        return Response(message, status=status.HTTP_204_NO_CONTENT)


class ExpenseTypesView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all expenses types",
        tags=[EXPENSE_TAG_IDENTIFIER],
    )
    def get(self, request):
        return ExpenseService.get_expense_types(request.user)

    @swagger_auto_schema(
        operation_summary="Create expense type",
        tags=[EXPENSE_TAG_IDENTIFIER],
        request_body=ExpenseTypeSerializer,
    )
    def post(self, request):
        created_type = ExpenseService.create_expense_type(request.user, request.data)
        return Response(created_type, status=status.HTTP_201_CREATED)


class ExpenseTypesDetailsView(APIView):
    permission_classes = []

    @swagger_auto_schema(
        operation_summary="Update expense type partially",
        tags=[EXPENSE_TAG_IDENTIFIER],
        request_body=ExpenseTypeSerializer,
    )
    def patch(self, request, id):
        updated = ExpenseService.update_expense_type_partial(id, request.data)
        return Response(updated, status=status.HTTP_200_OK)
