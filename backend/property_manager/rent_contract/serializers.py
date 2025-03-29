from rest_framework import serializers
from .models import RentContract


class RentContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentContract
        fields = "__all__"
