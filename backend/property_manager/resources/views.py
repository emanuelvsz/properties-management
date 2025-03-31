from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from resources.models import PaymentMethod
from drf_yasg.utils import swagger_auto_schema
from property_manager.utils import RESOURCES_TAG_IDENTIFIER


class PaymentMethodListView(APIView):
    """
    Endpoint to list all payment types.
    """

    @swagger_auto_schema(
        operation_summary="List all the possible rent payments",
        tags=[RESOURCES_TAG_IDENTIFIER],
    )
    def get(self, _):
        payment_methods = [method.value for method in PaymentMethod]
        return Response(payment_methods, status=status.HTTP_200_OK)
