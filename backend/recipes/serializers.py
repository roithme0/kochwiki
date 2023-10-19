from .models import Ingredient, Recipe

from rest_framework import serializers


class IngredientSerializer(serializers.ModelSerializer):
    name = serializers.CharField(label=Ingredient._meta.get_field("name").verbose_name)
    brand = serializers.CharField(
        label=Ingredient._meta.get_field("brand").verbose_name
    )
    kcal = serializers.FloatField(label=Ingredient._meta.get_field("kcal").verbose_name)
    carbs = serializers.FloatField(
        label=Ingredient._meta.get_field("carbs").verbose_name
    )
    protein = serializers.FloatField(
        label=Ingredient._meta.get_field("protein").verbose_name
    )
    fat = serializers.FloatField(label=Ingredient._meta.get_field("fat").verbose_name)

    class Meta:
        model = Ingredient
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"
