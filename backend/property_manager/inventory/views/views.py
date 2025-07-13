from inventory.serializers import (
    ListInventoryItemSerializer,
    CreateInventoryItemSerializer,
    PartialUpdateInventoryItemSerializer,
    CompleteUpdateInventoryItemSerializer,
    InventoryCategorySerializer,
)
from inventory.service import InventoryService
from property_manager.utils import INVENTORY_TAG_IDENTIFIER

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.pagination import PageNumberPagination


class InventoryListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all inventory items", tags=[INVENTORY_TAG_IDENTIFIER]
    )
    def get(self, request):
        user = request.user
        property_id = request.query_params.get("property_id")
        category_id = request.query_params.get("category_id")
        q = request.query_params.get("q")
        condition = request.query_params.get("condition")
        order_by = request.query_params.get("order_by")

        try:
            queryset, count, total = InventoryService.list_inventory_items(
                user=user,
                property_id=property_id,
                category_id=category_id,
                q=q,
                condition=condition,
                order_by=order_by,
            )

            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(queryset, request)
            if not paginated_queryset and paginator.page.number > 1:
                return Response(
                    {"detail": "Página fora do intervalo."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = ListInventoryItemSerializer(paginated_queryset, many=True)
            current_page = paginator.page.number
            page_size = paginator.get_page_size(request)
            return Response(
                {
                    "data": serializer.data,
                    "page": current_page,
                    "page_size": page_size,
                    "count": count,
                    "total": total,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @swagger_auto_schema(
        operation_summary="Create a new inventory item",
        request_body=CreateInventoryItemSerializer,
        tags=[INVENTORY_TAG_IDENTIFIER],
    )
    def post(self, request):
        serializer = CreateInventoryItemSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        user = request.user
        try:
            response = InventoryService.create_inventory_item(
                data=serializer.validated_data, user=user
            )
            return Response(
                ListInventoryItemSerializer(response).data, status=status.HTTP_201_CREATED
            )
        except ValueError as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )


class InventoryDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve an inventory item by ID", tags=[INVENTORY_TAG_IDENTIFIER]
    )
    def get(self, request, id):
        inventory_item = InventoryService.get_inventory_item_by_id(id)
        if not inventory_item:
            return Response(
                {"detail": "Inventory item not found."}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = ListInventoryItemSerializer(inventory_item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Partial update of an inventory item",
        request_body=PartialUpdateInventoryItemSerializer,
        tags=[INVENTORY_TAG_IDENTIFIER],
    )
    def patch(self, request, id):
        user = request.user
        try:
            inventory_item = InventoryService.update_inventory_item(id, request.data, user)
            if not inventory_item:
                return Response(
                    {"detail": "Inventory item not found."}, status=status.HTTP_404_NOT_FOUND
                )
            serializer = ListInventoryItemSerializer(inventory_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )

    @swagger_auto_schema(
        operation_summary="Complete update of an inventory item",
        request_body=CompleteUpdateInventoryItemSerializer,
        tags=[INVENTORY_TAG_IDENTIFIER],
    )
    def put(self, request, id):
        user = request.user
        serializer = CompleteUpdateInventoryItemSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        try:
            inventory_item = InventoryService.update_inventory_item(id, serializer.validated_data, user)
            if not inventory_item:
                return Response(
                    {"detail": "Inventory item not found."}, status=status.HTTP_404_NOT_FOUND
                )
            serializer = ListInventoryItemSerializer(inventory_item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )

    @swagger_auto_schema(
        operation_summary="Delete an inventory item", tags=[INVENTORY_TAG_IDENTIFIER]
    )
    def delete(self, request, id):
        user = request.user
        inventory_deleted = InventoryService.delete_inventory_item(id, user)
        if not inventory_deleted:
            return Response(
                {"detail": "Inventory item not found."}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(status=status.HTTP_204_NO_CONTENT)


class PropertyInventoryView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get property inventory items",
        tags=[INVENTORY_TAG_IDENTIFIER],
    )
    def get(self, request, property_id):
        user = request.user
        category_id = request.query_params.get("category_id")
        q = request.query_params.get("q")
        condition = request.query_params.get("condition")
        order_by = request.query_params.get("order_by", "newest")

        try:
            queryset, count, total = InventoryService.get_property_inventory(
                user=user,
                property_id=property_id,
                category_id=category_id,
                q=q,
                condition=condition,
                order_by=order_by,
            )
            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(queryset, request)
            if paginated_queryset is None:
                return Response(
                    {"detail": "Página fora do intervalo."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = ListInventoryItemSerializer(paginated_queryset, many=True)
            current_page = paginator.page.number
            page_size = paginator.get_page_size(request)
            return Response(
                {
                    "data": serializer.data,
                    "page": current_page,
                    "page_size": page_size,
                    "count": count,
                    "total": total,
                },
                status=status.HTTP_200_OK,
            )
        except ValueError as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class InventoryCategoriesView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all inventory categories", tags=[INVENTORY_TAG_IDENTIFIER]
    )
    def get(self, request):
        categories = InventoryService.list_categories()
        serializer = InventoryCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 