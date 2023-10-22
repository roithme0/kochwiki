from .models import Ingredient, Recipe

from rest_framework import serializers


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class CreateIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "name", "brand", "kcal", "carbs", "protein", "fat"


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"
