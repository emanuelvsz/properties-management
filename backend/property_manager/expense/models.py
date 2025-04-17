from django.db import models
from property.models import Property
from property_manager.models import BaseModel
from account.models import CustomUser
import uuid
from django.conf import settings


class ExpenseTypeEnum(models.TextChoices):
    FIXED = "fixed", "Fixed"
    VARIABLE = "variable", "Variable"
    UNEXPECTED = "unexpected", "Unexpected"


class Expense(BaseModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    expense_value = models.FloatField()
    description = models.TextField(null=True, blank=True)
    due_date = models.DateTimeField()
    payed_at = models.DateTimeField(null=True, blank=True)
    expense_type = models.CharField(
        max_length=20,
        choices=ExpenseTypeEnum.choices,
        default=ExpenseTypeEnum.FIXED,
    )

    class Meta:
        db_table = "expense"
        verbose_name = "Expense"
        verbose_name_plural = "Expenses"
