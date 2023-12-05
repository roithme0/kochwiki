from ..models.stepModel import Step

from rest_framework import serializers
import logging


logger = logging.getLogger("django")


class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = "__all__"