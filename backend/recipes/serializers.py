from .models import Ingredient, Recipe

from rest_framework import serializers


class CreateIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "name", "brand", "kcal", "carbs", "protein", "fat"

    def run_validation(self, data):
        data["kcal"] = validate_makro(data["kcal"], "kcal")
        data["carbs"] = validate_makro(data["carbs"], "carbs")
        data["protein"] = validate_makro(data["protein"], "protein")
        data["fat"] = validate_makro(data["fat"], "fat")
        return data


class UpdateIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "name", "brand", "kcal", "carbs", "protein", "fat"

    def run_validation(self, data):
        data["kcal"] = validate_makro(data["kcal"], "kcal")
        data["carbs"] = validate_makro(data["carbs"], "carbs")
        data["protein"] = validate_makro(data["protein"], "protein")
        data["fat"] = validate_makro(data["fat"], "fat")
        return data


def validate_makro(value, name):
    if value == "":
        return None
    try:
        return int(value)
    except ValueError:
        raise serializers.ValidationError(f"{name} must be an integer or empty")


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"
