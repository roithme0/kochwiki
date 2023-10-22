from django.shortcuts import render

from .models import Ingredient, Recipe
from .serializers import (
    IngredientSerializer,
    CreateIngredientSerializer,
    RecipeSerializer,
)

from rest_framework.generics import ListAPIView, CreateAPIView


class CreateIngredientView(CreateAPIView):
    serializer_class = CreateIngredientSerializer


class IngredientsView(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipesView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
