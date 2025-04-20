from django.db.models import Sum
from django.utils import timezone
from property.models import Property
from expense.models import Expense


class DashboardService:

    @staticmethod
    def get_returns_summary(user):
        user_properties = Property.objects.filter(user=user)
        gross_return = user_properties.aggregate(total=Sum("rent"))["total"] or 0

        now = timezone.now()
        expenses_qs = Expense.objects.filter(
            created_at__year=now.year, created_at__month=now.month
        )
        expenses = expenses_qs.aggregate(total=Sum("expense_value"))["total"] or 0

        return {
            "gross": gross_return,
            "expenses": expenses,
            "liquid": gross_return - expenses,
        }
