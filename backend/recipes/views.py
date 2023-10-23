from .models import Ingredient, Recipe
from .serializers import (
    IngredientSerializer,
    EditIngredientSerializer,
    EditIngredientSerializer,
    RecipeSerializer,
)

from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
)


class CreateIngredientView(CreateAPIView):
    serializer_class = EditIngredientSerializer


class UpdateIngredientView(UpdateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = EditIngredientSerializer


class IngredientView(RetrieveAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientsView(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipesView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
