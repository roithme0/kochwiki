from .models import Ingredient, Recipe

from rest_framework import serializers
import logging


logger = logging.getLogger("django")


class EditIngredientSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = (
            "name",
            "brand",
            "kcal",
            "carbs",
            "protein",
            "fat",
            "field_errors",
        )

    def get_field_errors(self, obj):
        if hasattr(obj, "errors"):
            return obj.errors
        else:
            return {}

    def validate(self, data):
        data["kcal"] = self.validate_makro(data["kcal"], "kcal")
        data["carbs"] = self.validate_makro(data["carbs"], "carbs")
        data["protein"] = self.validate_makro(data["protein"], "protein")
        data["fat"] = self.validate_makro(data["fat"], "fat")
        return data

    def validate_makro(self, value, name):
        if value == "":
            return None
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError(f"{name} must be an integer or empty")


class IngredientSerializer(serializers.ModelSerializer):
    labels = serializers.SerializerMethodField()
    blank_fields = serializers.SerializerMethodField()
    max_length = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"

    def get_labels(self, obj):
        return get_labels(self.Meta.model, self.fields)

    def get_blank_fields(self, obj):
        return get_blank_fields(self.Meta.model, self.fields)

    def get_max_length(self, obj):
        return get_max_length(self.Meta.model, self.fields)


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"


def get_max_length(model, fields):
    max_length = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            max_length[field.name] = field.max_length
    logger.warning(max_length)
    return max_length


def get_blank_fields(model, fields):
    blank_fields = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            blank_fields[field.name] = field.blank
    logger.warning(blank_fields)
    return blank_fields


def get_labels(model, fields):
    labels = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            labels[field.name] = field.verbose_name
    logger.debug(labels)
    return labels
