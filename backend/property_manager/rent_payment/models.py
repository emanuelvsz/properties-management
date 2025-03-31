from django.db import models
from rent_contract.models import RentContract
from property_manager.models import BaseModel
from resources.models import PaymentMethod


class RentPayment(BaseModel):
    rent_contract = models.ForeignKey(RentContract, on_delete=models.CASCADE)
    amount_paid = models.FloatField()
    payed_at = models.DateTimeField()
    due_date = models.DateTimeField()
    payment_method = models.CharField(
        max_length=50,
        choices=PaymentMethod.choices(),
    )

    class Meta:
        db_table = "rent_payment"
        verbose_name = "Rent Payment"
        verbose_name_plural = "Rent Payments"
