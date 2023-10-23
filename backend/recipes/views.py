from .models import Ingredient, Recipe
from .serializers import (
    IngredientSerializer,
    CreateIngredientSerializer,
    UpdateIngredientSerializer,
    RecipeSerializer,
)

from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
)


class CreateIngredientView(CreateAPIView):
    serializer_class = CreateIngredientSerializer


class UpdateIngredientView(UpdateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = UpdateIngredientSerializer


class IngredientView(RetrieveAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientsView(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipesView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
