from django.db import models

# Create your models here.

class Tenant(models.Model):
    id = models.UUIDField(primary_key=True, default=models.UUIDField, editable=False)
    name = models.CharField(max_length=255)
    birth_date = models.DateField()
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
