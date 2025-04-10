from rest_framework import status, viewsets
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rent_contract.service import RentContractService
from rent_contract.serializers import RentContractSerializer
from property_manager.utils import RENT_CONTRACT_TAG_IDENTIFIER
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


class RentContractListCreateView(APIView):
    """
    API endpoint for listing and creating rent contracts.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all rent contracts",
        responses={200: RentContractSerializer(many=True)},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def get(self, _):
        contracts = RentContractService.list_rent_contracts()
        serializer = RentContractSerializer(contracts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Create a new rent contract",
        request_body=RentContractSerializer,
        responses={201: RentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def post(self, request):
        contract = RentContractService.create_rent_contract(request.data)
        return Response(
            RentContractSerializer(contract).data, status=status.HTTP_201_CREATED
        )


class RentContractDetailView(APIView):
    """
    API endpoint for retrieving, updating, and deleting rent contracts by ID.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Retrieve a rent contract by ID",
        responses={200: RentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def get(self, _, pk=None):
        contract = RentContractService.get_rent_contract_by_id(pk)
        return Response(
            RentContractSerializer(contract).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Partially update a rent contract",
        request_body=RentContractSerializer,
        responses={200: RentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def patch(self, request, pk=None):
        contract = RentContractService.update_rent_contract(
            pk, request.data, partial=True
        )
        return Response(
            RentContractSerializer(contract).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Completely update a rent contract",
        request_body=RentContractSerializer,
        responses={200: RentContractSerializer()},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def put(self, request, pk=None):
        contract = RentContractService.update_rent_contract(
            pk, request.data, partial=False
        )
        return Response(
            RentContractSerializer(contract).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Delete a rent contract",
        responses={204: "No content"},
        tags=[RENT_CONTRACT_TAG_IDENTIFIER],
    )
    def delete(self, _, pk=None):
        message = RentContractService.delete_rent_contract(pk)
        return Response(message, status=status.HTTP_204_NO_CONTENT)
