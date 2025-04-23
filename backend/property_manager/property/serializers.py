from rest_framework import serializers
from .models import Property
from django.utils import timezone
from rent_contract.models import RentContract


class TenantInlineSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField()
    email = serializers.EmailField()
    phone = serializers.CharField()
    birth_date = serializers.DateField()


class ListPropertySerializer(serializers.ModelSerializer):
    tenant = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "bedrooms",
            "bathrooms",
            "surface",
            "rent",
            "furnished",
            "description",
            "status",
            "tenant",
            "location",
            "code",
        ]

    def get_tenant(self, obj):
        tenant = getattr(obj, "current_tenant", None)
        return TenantInlineSerializer(tenant).data if tenant else None


class CreatePropertySerializer(serializers.Serializer):
    title = serializers.CharField()
    bedrooms = serializers.IntegerField(default=1)
    bathrooms = serializers.IntegerField(default=1)
    surface = serializers.FloatField()
    rent = serializers.FloatField()
    furnished = serializers.BooleanField(default=False)
    description = serializers.CharField(required=False)
    location = serializers.CharField()


class PartialUpdatePropertySerializer(serializers.Serializer):
    title = serializers.CharField(allow_null=True, required=False)
    bedrooms = serializers.IntegerField(default=1, allow_null=True, required=False)
    bathrooms = serializers.IntegerField(default=1, allow_null=True, required=False)
    surface = serializers.FloatField(allow_null=True, required=False)
    rent = serializers.FloatField(allow_null=True, required=False)
    furnished = serializers.BooleanField(default=False, allow_null=True, required=False)
    description = serializers.CharField(allow_null=True, required=False)
    location = serializers.CharField(allow_null=True, required=False)


class CompleteUpdatePropertySerializer(serializers.Serializer):
    title = serializers.CharField(required=True)
    bedrooms = serializers.IntegerField(required=True)
    bathrooms = serializers.IntegerField(required=True)
    surface = serializers.FloatField(required=True)
    rent = serializers.FloatField(required=True)
    furnished = serializers.BooleanField(required=True)
    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    location = serializers.CharField(required=True)
