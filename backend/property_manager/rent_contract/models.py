from django.db import models
from django.contrib.auth.models import User
from property_manager.models import BaseModel
from property.models import Property
from tenant.models import Tenant
from django.conf import settings

class RentContract(BaseModel):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    started_at = models.DateTimeField()
    finish_at = models.DateTimeField()
    deposit = models.FloatField()
    payments_date = models.DateField(null=True, blank=True)
    archived = models.BooleanField(default=False)

    class Meta:
        db_table = "rent_contract"
        verbose_name = "Rent Contract"
        verbose_name_plural = "Rent Contracts"
