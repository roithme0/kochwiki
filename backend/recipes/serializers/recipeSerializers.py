from ..models.recipeModel import Recipe
from ..serializers.amountSerializers import AmountSerializer
from ..serializers.stepSerializers import StepSerializer
from backend.serializers import MetaSerializer

from rest_framework import serializers
import logging

logger = logging.getLogger("django")

class AddRecipeSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["servings", "preptime"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

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

class EditRecipeSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"
        read_only_fields = ["id"]

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["servings", "preptime"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

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

class RecipeSerializer(serializers.ModelSerializer):
    amounts = AmountSerializer(many=True)
    steps = StepSerializer(many=True)
    meta_data = serializers.SerializerMethodField()
    
    class Meta:
        model = Recipe
        fields = "__all__"
        
    def get_meta_data(self, obj):
        return MetaSerializer(obj).data