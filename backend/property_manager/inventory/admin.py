from django.contrib import admin
from .models import InventoryItem, InventoryCategory


@admin.register(InventoryCategory)
class InventoryCategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    search_fields = ["name", "description"]


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "property", "quantity", "condition", "created_at"]
    list_filter = ["category", "condition", "property"]
    search_fields = ["name", "description", "property__title"]
    readonly_fields = ["id", "created_at", "updated_at"] 