from django.db import models
import uuid

# Create your models here.


class Tenant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    birth_date = models.DateField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)

    class Meta:
        db_table = "tenant"
        verbose_name = "Tenant"
        verbose_name_plural = "Tenants"
