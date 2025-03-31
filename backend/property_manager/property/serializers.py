from rest_framework import serializers
from .models import Property


class ListPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = "__all__"


class CreatePropertySerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    title = serializers.CharField()
    bedrooms = serializers.IntegerField(default=1)
    bathrooms = serializers.IntegerField(default=1)
    surface = serializers.FloatField()
    rent_value = serializers.FloatField()
    furnished = serializers.BooleanField(default=False)
    description = serializers.CharField()


class PartialUpdatePropertySerializer(serializers.Serializer):
    title = serializers.CharField(allow_null=True, required=False)
    bedrooms = serializers.IntegerField(default=1, allow_null=True, required=False)
    bathrooms = serializers.IntegerField(default=1, allow_null=True, required=False)
    surface = serializers.FloatField(allow_null=True, required=False)
    rent_value = serializers.FloatField(allow_null=True, required=False)
    furnished = serializers.BooleanField(default=False, allow_null=True, required=False)
    description = serializers.CharField(allow_null=True, required=False)


class CompleteUpdatePropertySerializer(serializers.Serializer):
    title = serializers.CharField(required=True)
    bedrooms = serializers.IntegerField(required=True)
    bathrooms = serializers.IntegerField(required=True)
    surface = serializers.FloatField(required=True)
    rent_value = serializers.FloatField(required=True)
    furnished = serializers.BooleanField(required=True)
    description = serializers.CharField(required=True)

