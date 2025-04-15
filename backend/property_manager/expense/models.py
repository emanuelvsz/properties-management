from django.db import models
from property.models import Property
from property_manager.models import BaseModel
from account.models import CustomUser
import uuid
from django.conf import settings


class ExpenseType(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "expense_type"
        verbose_name = "Expense Type"
        verbose_name_plural = "Expense Types"


class Expense(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    expense_value = models.FloatField()
    description = models.TextField(null=True, blank=True)
    due_date = models.DateTimeField()
    payed_at = models.DateTimeField(null=True, blank=True)
    expense_type = models.ForeignKey(
        ExpenseType, on_delete=models.CASCADE, null=True, blank=True
    )

    class Meta:
        db_table = "expense"
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"
