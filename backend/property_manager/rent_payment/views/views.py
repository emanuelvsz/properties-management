from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from rent_payment.service import RentPaymentService
from rent_payment.serializers import RentPaymentSerializer
from rest_framework.permissions import IsAuthenticated


class RentPaymentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="List all rent payments",
        responses={200: RentPaymentSerializer(many=True)},
        tags=["Rent Payments"],
    )
    def get(self, _):
        rent_payments = RentPaymentService.list_rent_payments()
        return Response(
            RentPaymentSerializer(rent_payments, many=True).data,
            status=status.HTTP_200_OK,
        )

    @swagger_auto_schema(
        operation_summary="Create a new rent payment",
        request_body=RentPaymentSerializer,
        responses={201: RentPaymentSerializer()},
        tags=["Rent Payments"],
    )
    def post(self, request):
        rent_payment = RentPaymentService.create_rent_payment(request.data)
        return Response(
            RentPaymentSerializer(rent_payment).data, status=status.HTTP_201_CREATED
        )


class RentPaymentDetailView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        operation_summary="Get rent payment by ID",
        responses={200: RentPaymentSerializer()},
        tags=["Rent Payments"],
    )
    def get(self, _, payment_id):
        rent_payment = RentPaymentService.get_rent_payment_by_id(payment_id)
        return Response(
            RentPaymentSerializer(rent_payment).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Partial update a rent payment",
        request_body=RentPaymentSerializer,
        responses={200: RentPaymentSerializer()},
        tags=["Rent Payments"],
    )
    def patch(self, request, payment_id):
        rent_payment = RentPaymentService.update_rent_payment(
            payment_id, request.data, partial=True
        )
        return Response(
            RentPaymentSerializer(rent_payment).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Complete update a rent payment",
        request_body=RentPaymentSerializer,
        responses={200: RentPaymentSerializer()},
        tags=["Rent Payments"],
    )
    def put(self, request, payment_id):
        rent_payment = RentPaymentService.update_rent_payment(
            payment_id, request.data, partial=False
        )
        return Response(
            RentPaymentSerializer(rent_payment).data, status=status.HTTP_200_OK
        )

    @swagger_auto_schema(
        operation_summary="Delete a rent payment",
        responses={204: "No Content"},
        tags=["Rent Payments"],
    )
    def delete(self, _, payment_id):
        message = RentPaymentService.delete_rent_payment(payment_id)
        return Response(message, status=status.HTTP_204_NO_CONTENT)
