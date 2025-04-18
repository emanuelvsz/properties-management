from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from dashboard.service import DashboardService
from drf_yasg.utils import swagger_auto_schema

DASHBOARD_TAG_IDENTIFIER = "Dashboard"


class ReturnsSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_summary="Get gross, expenses, and liquid return for the current month",
        tags=[DASHBOARD_TAG_IDENTIFIER],
    )
    def get(self, request):
        summary = DashboardService.get_returns_summary(request.user)
        return Response(summary, status=status.HTTP_200_OK)
