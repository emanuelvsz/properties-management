from rest_framework import viewsets
from .models import RentContract
from .serializers import RentContractSerializer


class RentContractViewSet(viewsets.ModelViewSet):
    queryset = RentContract.objects.all()
    serializer_class = RentContractSerializer
