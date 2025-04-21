from rest_framework import serializers
from .models import RentContract
from django.utils import timezone


class ListRentContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = RentContract
        fields = [
            "id",
            "property",
            "tenant",
            "started_at",
            "finish_at",
            "deposit",
            "payments_date",
            "archived",
            "created_at",
        ]


class CreateRentContractSerializer(serializers.Serializer):
    property = serializers.UUIDField()
    tenant = serializers.UUIDField()
    started_at = serializers.DateTimeField()
    finish_at = serializers.DateTimeField()
    deposit = serializers.FloatField()
    payments_date = serializers.DateField(required=False, allow_null=True)

    def create(self, validated_data):
        property_id = validated_data.get("property")

        RentContract.objects.filter(
            property=property_id, archived=False, finish_at__gte=timezone.now()
        ).update(archived=True)

        return RentContract.objects.create(**validated_data)


class PartialUpdateRentContractSerializer(serializers.Serializer):
    started_at = serializers.DateTimeField(required=False)
    finish_at = serializers.DateTimeField(required=False)
    deposit = serializers.FloatField(required=False)
    payments_date = serializers.DateField(required=False, allow_null=True)
    archived = serializers.BooleanField(required=False)


class CompleteUpdateRentContractSerializer(serializers.Serializer):
    property = serializers.UUIDField()
    tenant = serializers.UUIDField()
    started_at = serializers.DateTimeField()
    finish_at = serializers.DateTimeField()
    deposit = serializers.FloatField()
    payments_date = serializers.DateField(required=False, allow_null=True)
    archived = serializers.BooleanField()
