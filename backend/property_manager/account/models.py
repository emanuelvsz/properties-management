from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.timezone import now


class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)
    birth = models.DateField(blank=True, null=True)
