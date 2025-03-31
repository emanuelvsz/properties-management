from django.db import models
from django.contrib.auth.models import User
from property.models import Property
from tenant.models import Tenant


class RentContract(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    started_at = models.DateTimeField()
    finish_at = models.DateTimeField()
    deposit = models.FloatField()

    class Meta:
        db_table = "rent_contract"
        verbose_name = "Rent Contract"
        verbose_name_plural = "Rent Contracts"
