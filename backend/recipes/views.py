from .models import Ingredient, Recipe
from .serializers import (
    IngredientSerializer,
    EditIngredientSerializer,
    EditIngredientSerializer,
    RecipeSerializer,
)

from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    ListAPIView,
)
import logging


logger = logging.getLogger("django")


class CreateIngredientView(CreateAPIView):
    serializer_class = EditIngredientSerializer


class UpdateIngredientView(UpdateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = EditIngredientSerializer

    def put(self, request, *args, **kwargs):
        logger.info(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            logger.info("update ingredient valid")
            self.perform_update(serializer)
            return Response(serializer.data, status=200)
        else:
            logger.warning("update ingredient invalid: \n%s" % serializer.errors)
            return Response(serializer.errors, status=403)


class IngredientView(RetrieveAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientsView(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipesView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
