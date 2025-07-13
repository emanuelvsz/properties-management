from rest_framework import serializers
from .models import InventoryItem, InventoryCategory


class InventoryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryCategory
        fields = ["id", "name", "description"]


class ListInventoryItemSerializer(serializers.ModelSerializer):
    category = InventoryCategorySerializer(read_only=True)
    property_title = serializers.CharField(source="property.title", read_only=True)
    property_code = serializers.CharField(source="property.code", read_only=True)
    purchase_price = serializers.FloatField(read_only=True, allow_null=True)

    class Meta:
        model = InventoryItem
        fields = [
            "id",
            "property",
            "property_title",
            "property_code",
            "category",
            "name",
            "description",
            "quantity",
            "condition",
            "brand",
            "model",
            "serial_number",
            "purchase_date",
            "purchase_price",
            "notes",
            "created_at",
            "updated_at",
        ]


class CreateInventoryItemSerializer(serializers.Serializer):
    property = serializers.UUIDField()
    category = serializers.UUIDField()
    name = serializers.CharField()
    description = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    quantity = serializers.IntegerField(default=1)
    condition = serializers.ChoiceField(
        choices=[
            ("excellent", "Excellent"),
            ("good", "Good"),
            ("fair", "Fair"),
            ("poor", "Poor"),
            ("damaged", "Damaged"),
        ],
        default="good",
    )
    brand = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    model = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    serial_number = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    purchase_date = serializers.DateField(required=False, allow_null=True)
    purchase_price = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class PartialUpdateInventoryItemSerializer(serializers.Serializer):
    property = serializers.UUIDField(required=False)
    category = serializers.UUIDField(required=False)
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    quantity = serializers.IntegerField(required=False)
    condition = serializers.ChoiceField(
        choices=[
            ("excellent", "Excellent"),
            ("good", "Good"),
            ("fair", "Fair"),
            ("poor", "Poor"),
            ("damaged", "Damaged"),
        ],
        required=False,
    )
    brand = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    model = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    serial_number = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    purchase_date = serializers.DateField(required=False, allow_null=True)
    purchase_price = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class CompleteUpdateInventoryItemSerializer(serializers.Serializer):
    property = serializers.UUIDField(required=True)
    category = serializers.UUIDField(required=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    quantity = serializers.IntegerField(required=True)
    condition = serializers.ChoiceField(
        choices=[
            ("excellent", "Excellent"),
            ("good", "Good"),
            ("fair", "Fair"),
            ("poor", "Poor"),
            ("damaged", "Damaged"),
        ],
        required=True,
    )
    brand = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    model = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    serial_number = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    purchase_date = serializers.DateField(required=False, allow_null=True)
    purchase_price = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True) 