from django.shortcuts import render

from .models import Recipe
from .serializers import RecipeSerializer

from rest_framework.generics import ListCreateAPIView


class RecipeView(ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
