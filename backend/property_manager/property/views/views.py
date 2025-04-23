from property.serializers import (
    ListPropertySerializer,
    CreatePropertySerializer,
    PartialUpdatePropertySerializer,
    CompleteUpdatePropertySerializer,
)
from property.service import PropertyService
from property_manager.utils import PROPERTY_TAG_IDENTIFIER
from expense.serializers import ExpenseSerializer
from rent_contract.serializers import ListRentContractSerializer

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.pagination import PageNumberPagination


class PropertyListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all properties", tags=[PROPERTY_TAG_IDENTIFIER]
    )
    def get(self, request):
        user = request.user
        q = request.query_params.get("q")
        bedrooms = request.query_params.get("bedrooms")
        bathrooms = request.query_params.get("bathrooms")
        surface = request.query_params.get("surface")
        order_by = request.query_params.get("order_by")
        furnished = request.query_params.get("furnished")

        try:
            bedrooms = int(bedrooms) if bedrooms is not None else None
            bathrooms = int(bathrooms) if bathrooms is not None else None
            surface = int(surface) if surface is not None else None
        except ValueError:
            return Response(
                {"detail": "bedrooms, bathrooms e surface devem ser inteiros."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if furnished is not None:
            furnished = furnished.lower()
            if furnished == "true":
                furnished = True
            elif furnished == "false":
                furnished = False
            elif furnished == "undefined":
                furnished = None
            else:
                return Response(
                    {"detail": "furnished should be 'true', 'false' or 'undefined'."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        queryset, count, total = PropertyService.list_properties(
            user=user,
            q=q,
            bedrooms=bedrooms,
            bathrooms=bathrooms,
            surface=surface,
            order_by=order_by,
            furnished=furnished,
        )

        print(queryset)
        paginator = PageNumberPagination()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        if not paginated_queryset and paginator.page.number > 1:
            return Response(
                {"detail": "Página fora do intervalo."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ListPropertySerializer(paginated_queryset, many=True)
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

    @swagger_auto_schema(
        operation_summary="Create a new property",
        request_body=CreatePropertySerializer,
        tags=[PROPERTY_TAG_IDENTIFIER],
    )
    def post(self, request):
        serializer = CreatePropertySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        user = request.user
        response = PropertyService.create_property(
            data=serializer.validated_data, user=user
        )
        return Response(
            ListPropertySerializer(response).data, status=status.HTTP_201_CREATED
        )


class PropertyDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve a property by ID", tags=[PROPERTY_TAG_IDENTIFIER]
    )
    def get(self, _, id):
        property_obj = PropertyService.get_property_by_id(id)
        serializer = ListPropertySerializer(property_obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Partial update of a property",
        request_body=PartialUpdatePropertySerializer,
        tags=[PROPERTY_TAG_IDENTIFIER],
    )
    def patch(self, request, id):
        property = PropertyService.update_property(id, request.data)
        if not property:
            Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = PartialUpdatePropertySerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Complete update of a property",
        request_body=CompleteUpdatePropertySerializer,
        tags=[PROPERTY_TAG_IDENTIFIER],
    )
    def put(self, request, id):
        property_obj = PropertyService.get_property_by_id(id)
        serializer = CompleteUpdatePropertySerializer(property_obj, data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        property = PropertyService.update_property(id, serializer.validated_data)
        if not property:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = CompleteUpdatePropertySerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Delete a property", tags=[PROPERTY_TAG_IDENTIFIER]
    )
    def delete(self, _, id):
        property_deleted = PropertyService.delete_property(id)
        if not property_deleted:
            return Response(
                {"detail": "Property not found."}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(status=status.HTTP_204_NO_CONTENT)


class PropertyExpensesView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get property expenses classified by type and grouped by date",
        tags=[PROPERTY_TAG_IDENTIFIER],
    )
    def get(self, request, id):
        property_id = id
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
            queryset, count, total = PropertyService.get_property_expenses(
                request.user, property_id, date_by, q, payed, order_by
            )
            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(queryset, request)
            if paginated_queryset is None:
                return Response(
                    {"detail": "Página fora do intervalo."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = ExpenseSerializer(paginated_queryset, many=True)
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


class PropertyContractsView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get property rent contracts",
        tags=[PROPERTY_TAG_IDENTIFIER],
    )
    def get(self, request, id):
        property_id = id
        archived = request.query_params.get("archived")
        q = request.query_params.get("q")
        order_by = request.query_params.get("order_by", "newest")

        if archived is not None:
            archived = archived.lower()
            if archived == "true":
                archived = True
            elif archived == "false":
                archived = False
            elif archived == "undefined":
                archived = None
            else:
                return Response(
                    {"detail": "archived should be 'true', 'false' or 'undefined'."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        try:
            queryset, count, total = PropertyService.get_property_contracts(
                request.user, property_id, archived, q, order_by
            )
            paginator = PageNumberPagination()
            paginated_queryset = paginator.paginate_queryset(queryset, request)
            if paginated_queryset is None:
                return Response(
                    {"detail": "Página fora do intervalo."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            serializer = ListRentContractSerializer(paginated_queryset, many=True)
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
