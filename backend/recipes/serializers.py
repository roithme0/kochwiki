from .models import Ingredient, Recipe

from rest_framework import serializers
import logging


logger = logging.getLogger("django")


class EditIngredientSerializer(serializers.ModelSerializer):
    labels = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "name", "brand", "kcal", "carbs", "protein", "fat"

    def get_labels(self, *args):
        return get_labels(self.Meta.model, self.fields)

    def run_validation(self, data):
        data["name"] = self.validate_name(data["name"])
        data["kcal"] = self.validate_makro(data["kcal"], "kcal")
        data["carbs"] = self.validate_makro(data["carbs"], "carbs")
        data["protein"] = self.validate_makro(data["protein"], "protein")
        data["fat"] = self.validate_makro(data["fat"], "fat")
        return data

    def validate_name(self, value):
        return value

    def validate_makro(self, value, name):
        if value == "":
            return None
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError(f"{name} must be an integer or empty")


class IngredientSerializer(serializers.ModelSerializer):
    labels = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"

    def get_labels(self, *args):
        return get_labels(self.Meta.model, self.fields)


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"


def get_labels(model, fields):
    labels = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            labels[field.name] = field.verbose_name
    logger.debug(labels)
    return labels
