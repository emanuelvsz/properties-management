from rent_payment.models import RentPayment
from rent_payment.serializers import RentPaymentSerializer
from django.shortcuts import get_object_or_404


class RentPaymentService:

    @staticmethod
    def list_rent_payments():
        return RentPayment.objects.all()

    @staticmethod
    def create_rent_payment(data):
        serializer = RentPaymentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.instance

    @staticmethod
    def get_rent_payment_by_id(payment_id):
        return get_object_or_404(RentPayment, id=payment_id)

    @staticmethod
    def update_rent_payment(payment_id, data, partial=True):
        rent_payment = get_object_or_404(RentPayment, id=payment_id)
        serializer = RentPaymentSerializer(rent_payment, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.instance

    @staticmethod
    def delete_rent_payment(payment_id):
        rent_payment = get_object_or_404(RentPayment, id=payment_id)
        rent_payment.delete()
        return {"detail": "Rent payment deleted successfully"}
