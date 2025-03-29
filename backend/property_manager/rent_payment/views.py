from .models import RentPayment
from .serializers import RentPaymentSerializer
from rest_framework import viewsets


# Create your views here.
class RentPaymentViewSet(viewsets.ModelViewSet):
    queryset = RentPayment.objects.all()
    serializer_class = RentPaymentSerializer
