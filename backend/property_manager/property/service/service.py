from property.models import Property
from rent_contract.models import RentContract
from expense.models import Expense

from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.db.models import Q
from django.utils import timezone
from django.db.models.functions import TruncWeek, TruncMonth, TruncYear


class PropertyService:
    @staticmethod
    def list_properties(
        user,
        q=None,
        bedrooms=None,
        bathrooms=None,
        surface=None,
        order_by=None,
        furnished=None,
    ):
        total = Property.objects.filter(user=user).count()
        queryset = Property.objects.filter(user=user)
        if q:
            queryset = queryset.filter(
                Q(title__icontains=q)
                | Q(description__icontains=q)
                | Q(code__icontains=q)
                | Q(location__icontains=q)
            )
        if bedrooms is not None:
            queryset = queryset.filter(bedrooms=bedrooms)
        if bathrooms is not None:
            queryset = queryset.filter(bathrooms=bathrooms)
        if surface is not None:
            queryset = queryset.filter(surface=surface)
        if furnished is not None:
            queryset = queryset.filter(furnished=furnished)
        count = queryset.count()
        if order_by:
            if order_by == "newest":
                queryset = queryset.order_by("-created_at")
            elif order_by == "oldest":
                queryset = queryset.order_by("created_at")
            elif order_by == "price_high":
                queryset = queryset.order_by("-rent")
            elif order_by == "price_low":
                queryset = queryset.order_by("rent")
            elif order_by == "most_bedrooms":
                queryset = queryset.order_by("-bedrooms")
            elif order_by == "less_bedrooms":
                queryset = queryset.order_by("bedrooms")
            elif order_by == "most_bathrooms":
                queryset = queryset.order_by("-bathrooms")
            elif order_by == "less_bathrooms":
                queryset = queryset.order_by("bathrooms")
        else:
            queryset = queryset.order_by("-id")
        now = timezone.now()
        props = list(queryset)
        for prop in props:
            contract = (
                RentContract.objects.filter(
                    property=prop, started_at__lte=now, finish_at__gte=now
                )
                .select_related("tenant")
                .first()
            )
            setattr(prop, "current_tenant", contract.tenant if contract else None)

        return props, count, total

    @staticmethod
    def get_property_by_id(property_id):
        """
        Retrieve a property record by its ID.

        :param id: The unique identifier of the property.
        :return: Property instance or None
        """
        property = Property.objects.get(id=property_id)
        return property

    def create_property(data, user):
        """
        Create a new property record.

        :param data: Dictionary containing property data.
        :return: The created Property instance.
        """
        property_instance = Property.objects.create(
            title=data.get("title"),
            bedrooms=data.get("bedrooms"),
            bathrooms=data.get("bathrooms"),
            surface=data.get("surface"),
            rent=data.get("rent"),
            furnished=data.get("furnished", False),
            description=data.get("description", ""),
            user=user,
            location=data.get("location"),
        )
        return property_instance

    @staticmethod
    def update_property(id, data):
        property = Property.objects.filter(id=id).first()
        if not property:
            return None
        for key, value in data.items():
            if hasattr(property, key):
                if key == "user_id":
                    try:
                        user = User.objects.get(id=value)
                        setattr(property, "user", user)
                    except User.DoesNotExist:
                        raise ValueError(f"User with ID {value} does not exist.")
                else:
                    setattr(property, key, value)
        try:
            property.save()
        except ValidationError as e:
            raise ValidationError(f"Error updating the property: {str(e)}")
        return property

    @staticmethod
    def delete_property(id):
        """
        Delete a property record by its ID.

        :param id: The unique identifier of the property.
        :return: Boolean value indicating success/failure.
        """
        try:
            property = Property.objects.get(id=id)
            property.delete()
            return True
        except Property.DoesNotExist:
            return False

    @staticmethod
    def get_property_expenses(
        user, property_id, date_by, q=None, payed=None, order_by=None
    ):
        """
        Get property expenses and classify them by type, summing expense values.

        :param user: The authenticated user.
        :param property_id: The unique identifier of the property.
        :param date_by: The date interval for grouping ('week', 'month', 'year').
        :param q: Optional search query for filtering expenses by name or description.
        :param payed: Optional boolean to filter by payment status.
        :param order_by: Optional ordering ('newest', 'oldest', 'highest_value', 'lowest_value', 'due_soon', 'due_late').
        :return: A filtered and ordered queryset of expenses.
        """
        queryset = Expense.objects.filter(property_id=property_id, property__user=user)
        total = queryset.count()
        if q:
            queryset = queryset.filter(
                Q(name__icontains=q) | Q(description__icontains=q)
            )
        if payed is not None:
            if str(payed).lower() == "true":
                queryset = queryset.filter(payed_at__isnull=False)
            elif str(payed).lower() == "false":
                queryset = queryset.filter(payed_at__isnull=True)

        if order_by:
            if order_by == "newest":
                queryset = queryset.order_by("-created_at")
            elif order_by == "oldest":
                queryset = queryset.order_by("created_at")
            elif order_by == "highest_value":
                queryset = queryset.order_by("-expense_value")
            elif order_by == "lowest_value":
                queryset = queryset.order_by("expense_value")
            elif order_by == "due_soon":
                queryset = queryset.order_by("due_date")
            elif order_by == "due_late":
                queryset = queryset.order_by("-due_date")
        else:
            queryset = queryset.order_by("-id")

        if date_by == "week":
            queryset = queryset.annotate(period=TruncWeek("created_at"))
        elif date_by == "month":
            queryset = queryset.annotate(period=TruncMonth("created_at"))
        elif date_by == "year":
            queryset = queryset.annotate(period=TruncYear("created_at"))
        else:
            raise ValueError(
                "Invalid date_by parameter. Use 'week', 'month', or 'year'."
            )
        count = queryset.count()
        return queryset, count, total

    @staticmethod
    def get_property_contracts(user, property_id, archived=None, q=None, order_by=None):
        """
        Get property rent contracts, with optional filtering, ordering and period grouping.

        :param user: The authenticated user.
        :param property_id: The unique identifier of the property.
        :param archived: Optional boolean to filter archived status.
        :param q: Optional search query for filtering contracts by tenant name or description.
        :param order_by: Optional ordering ('newest', 'oldest', 'highest_rent', 'lowest_rent', 'end_soon', 'end_late').
        :return: A filtered and ordered queryset of rent contracts, count, and total.
        """
        queryset = RentContract.objects.filter(user=user, property_id=property_id)
        total = queryset.count()

        if archived is not None:
            queryset = queryset.filter(archived=archived)

        if q:
            queryset = queryset.filter(
                Q(tenant_name__icontains=q) | Q(description__icontains=q)
            )

        if order_by:
            if order_by == "newest":
                queryset = queryset.order_by("-created_at")
            elif order_by == "oldest":
                queryset = queryset.order_by("created_at")
            elif order_by == "highest_rent":
                queryset = queryset.order_by("-rent_value")
            elif order_by == "lowest_rent":
                queryset = queryset.order_by("rent_value")
            elif order_by == "end_soon":
                queryset = queryset.order_by("end_date")
            elif order_by == "end_late":
                queryset = queryset.order_by("-end_date")
        else:
            queryset = queryset.order_by("-id")
        count = queryset.count()
        return queryset, count, total
