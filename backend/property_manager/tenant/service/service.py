from tenant.models import Tenant


class TenantService:
    @staticmethod
    def list_tenants():
        return Tenant.objects.all()

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
        tenant = Tenant.objects.get(pk=tenant_id)
        tenant.delete()
        return {"detail": "Tenant deleted successfully"}
