from .models import Ingredient
from .serializers import (
    IngredientSerializer,
    AddIngredientSerializer,
    EditIngredientSerializer,
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


class CreateIngredientView(CreateAPIView):
    serializer_class = AddIngredientSerializer
    
    def post(self, request, *args, **kwargs):
        logger.info("request data: \n%s" % request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            logger.info("create ingredient valid")
            self.perform_create(serializer)
            return Response(serializer.data, status=201)
        else:
            logger.warning("create ingredient invalid: \n%s" % serializer.errors)
            return Response(serializer.errors, status=403)


class RetrieveUpdateIngredientView(RetrieveUpdateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = EditIngredientSerializer

    def put(self, request, *args, **kwargs):
        logger.info("request data: \n%s" % request.data)
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            logger.info("update ingredient valid")
            self.perform_update(serializer)
            return Response(serializer.data, status=200)
        else:
            logger.warning("update ingredient invalid: \n%s" % serializer.errors)
            return Response(serializer.errors, status=403)


class DestroyIngredientView(DestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RetrieveIngredientView(RetrieveAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class ListIngredientsView(ListAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
