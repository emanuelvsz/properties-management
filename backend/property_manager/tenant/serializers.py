from rest_framework import serializers
from .models import Tenant
from rent_contract.models import RentContract
from django.utils import timezone


class TenantSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    birthDate = serializers.DateField(source='birth_date')
    
    class Meta:
        model = Tenant
        fields = ["id", "name", "birth_date", "email", "phone", "user", "status", "birthDate"]
    
    def get_status(self, obj):
        now = timezone.now().date()
        active_contract = RentContract.objects.filter(
            tenant=obj,
            archived=False,
            started_at__date__lte=now,
            finish_at__date__gte=now
        ).first()
        return "active" if active_contract else "inactive"
