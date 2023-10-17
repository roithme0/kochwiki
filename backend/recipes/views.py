from django.shortcuts import render

from .models import Ingredient, Recipe
from .serializers import IngredientSerializer, RecipeSerializer

from rest_framework.generics import ListCreateAPIView


class IngredientView(ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeView(ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
