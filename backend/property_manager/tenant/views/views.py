from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from tenant.service import TenantService
from tenant.serializers import TenantSerializer
from property_manager.utils import TENANT_TAG_IDENTIFIER
from rest_framework.permissions import IsAuthenticated


class TenantListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all tenants",
        responses={200: TenantSerializer(many=True)},
        tags=[TENANT_TAG_IDENTIFIER],
    )
    def get(self, request):
        user = request.user
        q = request.query_params.get("q")
        order_by = request.query_params.get("order_by")
        tenants = TenantService.list_tenants(user, q, order_by)
        serializer = TenantSerializer(tenants, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Create a new tenant",
        request_body=TenantSerializer,
        responses={201: TenantSerializer()},
        tags=[TENANT_TAG_IDENTIFIER],
    )
    def post(self, request):
        tenant = TenantService.create_tenant(request.data)
        serializer = TenantSerializer(tenant)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TenantDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve a tenant by ID",
        responses={200: TenantSerializer()},
        tags=[TENANT_TAG_IDENTIFIER],
    )
    def get(self, _, pk):
        tenant = TenantService.get_tenant_by_id(pk)
        serializer = TenantSerializer(tenant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Partially update a tenant",
        request_body=TenantSerializer,
        responses={200: TenantSerializer()},
        tags=[TENANT_TAG_IDENTIFIER],
    )
    def patch(self, request, pk):
        tenant = TenantService.update_tenant(pk, request.data, partial=True)
        serializer = TenantSerializer(tenant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Completely update a tenant",
        request_body=TenantSerializer,
        responses={200: TenantSerializer()},
        tags=[TENANT_TAG_IDENTIFIER],
    )
    def put(self, request, pk):
        tenant = TenantService.update_tenant(pk, request.data, partial=False)
        serializer = TenantSerializer(tenant)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Delete a tenant",
        responses={204: "No Content"},
        tags=[TENANT_TAG_IDENTIFIER],
    )
    def delete(self, _, pk):
        message = TenantService.delete_tenant(pk)
        return Response(message, status=status.HTTP_204_NO_CONTENT)
