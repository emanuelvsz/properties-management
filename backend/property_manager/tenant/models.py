from django.db import models
from property_manager.models import BaseModel
import uuid
from django.conf import settings


class Tenant(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    birth_date = models.DateField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        db_table = "tenant"
        verbose_name = "Tenant"
        verbose_name_plural = "Tenants"
