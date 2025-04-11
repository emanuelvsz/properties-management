from property.models import Property
from rent_contract.models import RentContract

from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.db.models import Q
from django.utils import timezone

class PropertyService:

    @staticmethod
    def list_properties(
        user, q=None, bedrooms=None, bathrooms=None, surface=None, order_by=None
    ):
        queryset = Property.objects.filter(user=user)

        if q:
            queryset = queryset.filter(
                Q(title__icontains=q) | Q(description__icontains=q)
            )
        if bedrooms is not None:
            queryset = queryset.filter(bedrooms=bedrooms)
        if bathrooms is not None:
            queryset = queryset.filter(bathrooms=bathrooms)
        if surface is not None:
            queryset = queryset.filter(surface=surface)

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
        for prop in queryset:
            contract = (
                RentContract.objects.filter(
                    property=prop, started_at__lte=now, finish_at__gte=now
                )
                .select_related("tenant")
                .first()
            )
            setattr(prop, "current_tenant", contract.tenant if contract else None)

        return queryset

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
            raise ValidationError(f"Erro ao atualizar a propriedade: {str(e)}")
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
