from rent_contract.models import RentContract
from rent_contract.serializers import RentContractSerializer
from django.shortcuts import get_object_or_404


class RentContractService:

    @staticmethod
    def list_rent_contracts():
        return RentContract.objects.all()

    @staticmethod
    def create_rent_contract(data):
        serializer = RentContractSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        return serializer.save()

    @staticmethod
    def get_rent_contract_by_id(contract_id):
        return get_object_or_404(RentContract, id=contract_id)

    @staticmethod
    def update_rent_contract(contract_id, data, partial=True):
        contract = get_object_or_404(RentContract, id=contract_id)
        serializer = RentContractSerializer(contract, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        return serializer.save()

    @staticmethod
    def delete_rent_contract(contract_id):
        contract = get_object_or_404(RentContract, id=contract_id)
        contract.delete()
        return {"message": "Rent contract deleted successfully"}
