from django.db import models
from django.contrib.auth.models import User
from property_manager.models import BaseModel
import uuid
from django.conf import settings


class Property(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    surface = models.FloatField()
    rent = models.FloatField()
    furnished = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ("free", "Free"),
            ("rented", "Rented"),
            ("maintance", "Maintance"),
            ("reforbish", "Reforbish"),
        ],
        default="free"
    )
    class Meta:
        db_table = "property"
        verbose_name = "Property"
        verbose_name_plural = "Properties"
