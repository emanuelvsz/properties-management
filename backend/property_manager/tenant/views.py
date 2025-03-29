from .models import Tenant
from .serializers import TenantSerializer
from rest_framework import viewsets

class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer