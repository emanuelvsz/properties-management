from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from property.serializers import (
    ListPropertySerializer,
    CreatePropertySerializer,
    PartialUpdatePropertySerializer,
    CompleteUpdatePropertySerializer,
)
from property.service import PropertyService
from property_manager.utils import PROPERTY_TAG_IDENTIFIER
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class PropertyListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all properties", tags=[PROPERTY_TAG_IDENTIFIER]
    )
    def get(self, request):
        user = request.user
        properties = PropertyService.list_properties(user)
        serializer = ListPropertySerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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
