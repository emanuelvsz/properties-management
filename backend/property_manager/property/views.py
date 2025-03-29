from property.models import Property
from property.serializers import PropertySerializer
from rest_framework import viewsets


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
