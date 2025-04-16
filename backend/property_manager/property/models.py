from property_manager.models import BaseModel

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import uuid


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
        default="free",
    )
    location = models.TextField()
    code = models.CharField(max_length=6, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_unique_code()
        super().save(*args, **kwargs)

    def generate_unique_code(self):
        while True:
            code = f"{random.randint(100000, 999999)}"
            if not Property.objects.filter(code=code).exists():
                return code

    class Meta:
        db_table = "property"
        verbose_name = "Property"
        verbose_name_plural = "Properties"
