from .models import Recipe
from .serializers import (
    RecipeSerializer,
)

from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
    RetrieveAPIView,
    ListAPIView,
)
import logging


logger = logging.getLogger("django")


class ListRecipesView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
