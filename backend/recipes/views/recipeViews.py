from ..models.recipeModel import Recipe
from ..serializers.recipeSerializers import RecipeSerializer, AddRecipeSerializer, EditRecipeSerializer
from backend.serializers import MetaSerializer

from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateAPIView,
    DestroyAPIView,
    RetrieveAPIView,
    ListAPIView,
)
from rest_framework.views import APIView
import logging

logger = logging.getLogger("django")

class CreateRecipeView(CreateAPIView):
    serializer_class = AddRecipeSerializer
    
    def post(self, request, *args, **kwargs):
        logger.info("request data: \n%s" % request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            logger.info("create recipe valid")
            self.perform_create(serializer)
            return Response(serializer.data, status=201)
        else:
            logger.warning("create recipe invalid: \n%s" % serializer.errors)
            return Response(serializer.errors, status=403)
        
class RetrieveUpdateRecipeView(RetrieveUpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = EditRecipeSerializer

    def put(self, request, *args, **kwargs):
        logger.info("request data: \n%s" % request.data)
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data)
        if serializer.is_valid():
            logger.info("update recipe valid")
            self.perform_update(serializer)
            return Response(serializer.data, status=200)
        else:
            logger.warning("update recipe invalid: \n%s" % serializer.errors)
            return Response(serializer.errors, status=403)
        
class DestroyRecipeView(DestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.id
        self.perform_destroy(instance)
        return Response(id)

class RetrieveRecipeView(RetrieveAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class ListRecipesView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    
class RecipeMetaView(APIView):
    def get(self, request, format=None):
        serializer = MetaSerializer(Recipe())
        return Response(serializer.data)