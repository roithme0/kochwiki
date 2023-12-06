from .models import Ingredient
from backend.serializers import MetaSerializer
from rest_framework import serializers
import logging

logger = logging.getLogger("django")

class AddIngredientSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["kcal", "carbs", "protein", "fat"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

    # def validate(self, data):
    #     # rest framework cannot validate unique constraint: https://github.com/encode/django-rest-framework/issues/7173
    #     logger.warning(data)
    #     return data

    def validate(self, data):
        queryset = Ingredient.objects.all()
        if queryset.filter(name=data["name"], brand=data["brand"]).exists():
            raise serializers.ValidationError("Diese Zutat existiert bereits.")
        return data

    def get_field_errors(self, obj):
        if hasattr(obj, "errors"):
            return obj.errors
        else:
            return {}

    def get_non_field_errors(self, obj):
        if hasattr(obj, "non_field_errors"):
            return obj.non_field_errors
        else:
            return []

class EditIngredientSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"
        read_only_fields = ["id"]

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["kcal", "carbs", "protein", "fat"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

    # def validate(self, data):
    #     # rest framework cannot validate unique constraint: https://github.com/encode/django-rest-framework/issues/7173
    #     logger.warning(data)
    #     return data

    def validate(self, data):
        queryset = Ingredient.objects.exclude(pk=self.instance.pk)
        if queryset.filter(name=data["name"], brand=data["brand"]).exists():
            raise serializers.ValidationError("Diese Zutat existiert bereits.")
        return data

    def get_field_errors(self, obj):
        if hasattr(obj, "errors"):
            return obj.errors
        else:
            return {}

    def get_non_field_errors(self, obj):
        if hasattr(obj, "non_field_errors"):
            return obj.non_field_errors
        else:
            return []

class IngredientSerializer(serializers.ModelSerializer):
    meta_data = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"
        
    def get_meta_data(self, obj):
        return MetaSerializer(obj).data
