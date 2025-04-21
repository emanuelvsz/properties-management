from tenant.models import Tenant
from django.db.models import Q


class TenantService:
    @staticmethod
    def list_tenants(
        user,
        q=None,
        order_by=None,
    ):
        queryset = Tenant.objects.filter(user=user)

        if q:
            queryset = queryset.filter(
                Q(name__icontains=q) | Q(phone__icontains=q) | Q(email__icontains=q)
            )

        if order_by:
            if order_by == "newest":
                queryset = queryset.order_by("-created_at")
            elif order_by == "oldest":
                queryset = queryset.order_by("created_at")
        else:
            queryset = queryset.order_by("-id")
        return queryset

    @staticmethod
    def get_tenant_by_id(tenant_id):
        return Tenant.objects.get(pk=tenant_id)

    @staticmethod
    def create_tenant(data):
        return Tenant.objects.create(**data)

    @staticmethod
    def update_tenant(tenant_id, data, partial=False):
        tenant = Tenant.objects.get(pk=tenant_id)
        for attr, value in data.items():
            setattr(tenant, attr, value)
        tenant.save()
        return tenant

    @staticmethod
    def delete_tenant(tenant_id):
        print("tenant: ", tenant_id)
        tenant = Tenant.objects.get(id=tenant_id)
        tenant.delete()
        return {"detail": "Tenant deleted successfully"}
