from ..models.amountModel import Amount
from ingredients.serializers import IngredientSerializer

from rest_framework import serializers
import logging


logger = logging.getLogger("django")


class AmountSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    
    class Meta:
        model = Amount
        fields = "__all__"