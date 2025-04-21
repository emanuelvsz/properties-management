from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rent_contract.service import RentContractService
from rent_contract.serializers import (
    ListRentContractSerializer,
    CreateRentContractSerializer,
    PartialUpdateRentContractSerializer,
    CompleteUpdateRentContractSerializer,
)
from property_manager.utils import RENT_CONTRACT_TAG_IDENTIFIER
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class RentContractListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all rent contracts",
        responses={200: ListRentContractSerializer(many=True)},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def get(self, _):
        contracts = RentContractService.list_rent_contracts()
        serializer = ListRentContractSerializer(contracts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Create a new rent contract",
        request_body=CreateRentContractSerializer,
        responses={201: ListRentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def post(self, request):
        user = request.user
        serializer = CreateRentContractSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        contract = RentContractService.create_rent_contract(user, serializer.validated_data)
        return Response(
            ListRentContractSerializer(contract).data, status=status.HTTP_201_CREATED
        )


class RentContractDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve a rent contract by ID",
        responses={200: ListRentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def get(self, _, pk=None):
        contract = RentContractService.get_rent_contract_by_id(pk)
        return Response(
            ListRentContractSerializer(contract).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Partially update a rent contract",
        request_body=PartialUpdateRentContractSerializer,
        responses={200: ListRentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def patch(self, request, pk=None):
        user = request.user
        serializer = PartialUpdateRentContractSerializer(
            data=request.data, partial=True
        )
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        contract = RentContractService.update_rent_contract(
            user, pk, serializer.validated_data, partial=True
        )
        return Response(
            ListRentContractSerializer(contract).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Completely update a rent contract",
        request_body=CompleteUpdateRentContractSerializer,
        responses={200: ListRentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def put(self, request, pk=None):
        user = request.user
        serializer = CompleteUpdateRentContractSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        contract = RentContractService.update_rent_contract(
            user, pk, serializer.validated_data, partial=False
        )
        return Response(
            ListRentContractSerializer(contract).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Delete a rent contract",
        responses={204: "No content"},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def delete(self, _, pk=None):
        RentContractService.delete_rent_contract(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)
