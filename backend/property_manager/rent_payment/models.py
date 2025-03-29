from django.db import models
from rent_contract.models import RentContract

# Create your models here.


class RentPayment(models.Model):
    rent_contract = models.ForeignKey(RentContract, on_delete=models.CASCADE)
    amount_paid = models.FloatField()
    payed_at = models.DateTimeField()
    due_date = models.DateTimeField()
    payment_method = models.CharField(
        max_length=50,
        choices=[
            ("debit", "Debit Card"),
            ("money", "Money"),
            ("credit", "Credit Card"),
        ],
    )
