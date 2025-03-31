from property.models import Property

from django.core.exceptions import ValidationError
from django.contrib.auth.models import User


class PropertyService:
    @staticmethod
    def list_properties():
        """
        Retrieve all property records.
        """
        return Property.objects.all()

    @staticmethod
    def get_property_by_id(property_id):
        """
        Retrieve a property record by its ID.

        :param id: The unique identifier of the property.
        :return: Property instance or None
        """
        property = Property.objects.get(id=property_id)
        return property

    def create_property(data):
        """
        Create a new property record.

        :param data: Dictionary containing property data.
        :return: The created Property instance.
        """
        user_id = data.get("user_id")
        property_instance = Property.objects.create(
            title=data.get("title"),
            bedrooms=data.get("bedrooms"),
            bathrooms=data.get("bathrooms"),
            surface=data.get("surface"),
            rent_value=data.get("rent_value"),
            furnished=data.get("furnished", False),
            description=data.get("description", ""),
            user_id=user_id,
        )
        return property_instance

    @staticmethod
    def update_property(id, data):
        property = Property.objects.filter(id=id).first()
        if not property:
            return None
        for key, value in data.items():
            if hasattr(property, key):  
                if (
                    key == "user_id"
                ): 
                    try:
                        user = User.objects.get(id=value)
                        setattr(
                            property, "user", user
                        ) 
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
