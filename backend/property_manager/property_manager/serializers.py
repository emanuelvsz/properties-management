from rest_framework import serializers


class PaginationSerializer(serializers.Serializer):
    data = serializers.SerializerMethodField()
    page = serializers.IntegerField()
    page_size = serializers.IntegerField()
    total = serializers.IntegerField()

    def get_data(self, obj):
        serializer_class = self.context.get("serializer_class")
        if not serializer_class:
            raise ValueError("Missing 'serializer_class' in context")
        return serializer_class(obj["data"], many=True, context=self.context).data
