from inventory.models import InventoryItem, InventoryCategory
from property.models import Property

from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.db.models import Q
from django.utils import timezone


class InventoryService:
    @staticmethod
    def list_inventory_items(
        user,
        property_id=None,
        category_id=None,
        q=None,
        condition=None,
        order_by=None,
    ):
        total = InventoryItem.objects.filter(property__user=user).count()
        queryset = InventoryItem.objects.filter(property__user=user).select_related("property", "category")
        
        if property_id:
            queryset = queryset.filter(property_id=property_id)
        
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        
        if q:
            queryset = queryset.filter(
                Q(name__icontains=q)
                | Q(description__icontains=q)
                | Q(brand__icontains=q)
                | Q(model__icontains=q)
                | Q(serial_number__icontains=q)
                | Q(property__title__icontains=q)
            )
        
        if condition:
            queryset = queryset.filter(condition=condition)
        
        count = queryset.count()
        
        if order_by:
            if order_by == "newest":
                queryset = queryset.order_by("-created_at")
            elif order_by == "oldest":
                queryset = queryset.order_by("created_at")
            elif order_by == "name_asc":
                queryset = queryset.order_by("name")
            elif order_by == "name_desc":
                queryset = queryset.order_by("-name")
            elif order_by == "quantity_high":
                queryset = queryset.order_by("-quantity")
            elif order_by == "quantity_low":
                queryset = queryset.order_by("quantity")
            elif order_by == "price_high":
                queryset = queryset.order_by("-purchase_price")
            elif order_by == "price_low":
                queryset = queryset.order_by("purchase_price")
        else:
            queryset = queryset.order_by("-created_at")

        return list(queryset), count, total

    @staticmethod
    def get_inventory_item_by_id(item_id):
        try:
            return InventoryItem.objects.select_related("property", "category").get(id=item_id)
        except InventoryItem.DoesNotExist:
            return None

    @staticmethod
    def create_inventory_item(data, user):
        try:
            property_obj = Property.objects.get(id=data.get("property"), user=user)
            category_obj = InventoryCategory.objects.get(id=data.get("category"))
            
            inventory_item = InventoryItem.objects.create(
                property=property_obj,
                category=category_obj,
                name=data.get("name"),
                description=data.get("description", ""),
                quantity=data.get("quantity", 1),
                condition=data.get("condition", "good"),
                brand=data.get("brand", ""),
                model=data.get("model", ""),
                serial_number=data.get("serial_number", ""),
                purchase_date=data.get("purchase_date"),
                purchase_price=data.get("purchase_price"),
                notes=data.get("notes", ""),
            )
            return inventory_item
        except Property.DoesNotExist:
            raise ValueError("Property not found or does not belong to user")
        except InventoryCategory.DoesNotExist:
            raise ValueError("Category not found")

    @staticmethod
    def update_inventory_item(item_id, data, user):
        try:
            inventory_item = InventoryItem.objects.get(id=item_id, property__user=user)
            
            if "property" in data:
                try:
                    property_obj = Property.objects.get(id=data["property"], user=user)
                    inventory_item.property = property_obj
                except Property.DoesNotExist:
                    raise ValueError("Property not found or does not belong to user")
            
            if "category" in data:
                try:
                    category_obj = InventoryCategory.objects.get(id=data["category"])
                    inventory_item.category = category_obj
                except InventoryCategory.DoesNotExist:
                    raise ValueError("Category not found")
            
            for key, value in data.items():
                if hasattr(inventory_item, key) and key not in ["property", "category"]:
                    setattr(inventory_item, key, value)
            
            inventory_item.save()
            return inventory_item
        except InventoryItem.DoesNotExist:
            return None

    @staticmethod
    def delete_inventory_item(item_id, user):
        try:
            inventory_item = InventoryItem.objects.get(id=item_id, property__user=user)
            inventory_item.delete()
            return True
        except InventoryItem.DoesNotExist:
            return False

    @staticmethod
    def get_property_inventory(user, property_id, q=None, category_id=None, condition=None, order_by=None):
        try:
            property_obj = Property.objects.get(id=property_id, user=user)
        except Property.DoesNotExist:
            raise ValueError("Property not found or does not belong to user")
        
        return InventoryService.list_inventory_items(
            user=user,
            property_id=property_id,
            category_id=category_id,
            q=q,
            condition=condition,
            order_by=order_by,
        )

    @staticmethod
    def list_categories():
        return InventoryCategory.objects.all().order_by("name") 