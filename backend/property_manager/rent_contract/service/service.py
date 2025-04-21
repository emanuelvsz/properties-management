from rent_contract.models import RentContract
from rent_contract.serializers import ListRentContractSerializer
from django.shortcuts import get_object_or_404
from property.models import Property
from tenant.models import Tenant


class RentContractService:

    @staticmethod
    def list_rent_contracts():
        return RentContract.objects.all()

    @staticmethod
    def create_rent_contract(user, data):
        property_id = data.get("property")
        tenant_id = data.get("tenant")
        started_at = data.get("started_at")
        finish_at = data.get("finish_at")
        deposit = data.get("deposit")
        payments_date = data.get("payments_date")

        if property_id:
            RentContract.objects.filter(
                property_id=property_id, archived=False, user=user
            ).update(archived=True)

        data["user"] = user.id
        contract_property = Property.objects.filter(id=property_id).first()
        contract_tenant = Tenant.objects.filter(id=tenant_id).first()

        RentContract.objects.create(
            tenant=contract_tenant,
            property=contract_property,
            user=user,
            started_at=started_at,
            finish_at=finish_at,
            deposit=deposit,
            payments_date=payments_date,
        )

        return None

    @staticmethod
    def get_rent_contract_by_id(contract_id):
        return get_object_or_404(RentContract, id=contract_id)

    @staticmethod
    def update_rent_contract(user, contract_id, data, partial=True):
        contract = get_object_or_404(RentContract, id=contract_id, user=user)
        serializer = ListRentContractSerializer(contract, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        return serializer.save()

    @staticmethod
    def delete_rent_contract(contract_id):
        contract = get_object_or_404(RentContract, id=contract_id)
        contract.delete()
        return {"message": "Rent contract deleted successfully"}
