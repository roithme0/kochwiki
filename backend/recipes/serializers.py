from .models import Ingredient, Recipe

from rest_framework import serializers


class CreateIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "name", "brand", "kcal", "carbs", "protein", "fat"


class UpdateIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "name", "brand", "kcal", "carbs", "protein", "fat"


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"
