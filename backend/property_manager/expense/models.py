from django.db import models
from property.models import Property

# Create your models here.
class Expense(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    expense_value = models.FloatField()
    description = models.TextField(null=True, blank=True)
    due_date = models.DateTimeField()