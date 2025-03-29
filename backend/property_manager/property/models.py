from django.db import models
from django.contrib.auth.models import User


class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=models.UUIDField, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True, blank=True)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    surface = models.FloatField()
    rent_value = models.FloatField()
    furnished = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)
