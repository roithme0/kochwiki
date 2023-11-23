from .models import Recipe

from rest_framework import serializers
import logging


logger = logging.getLogger("django")


class RecipeSerializer(serializers.ModelSerializer):
    verbose_names = serializers.SerializerMethodField()
    blank_fields = serializers.SerializerMethodField()
    max_length = serializers.SerializerMethodField()
    choices = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"

    def get_verbose_names(self, obj):
        return get_verbose_names(self.Meta.model, self.fields)

    def get_blank_fields(self, obj):
        return get_blank_fields(self.Meta.model, self.fields)

    def get_max_length(self, obj):
        return get_max_length(self.Meta.model, self.fields)

    def get_choices(self, obj):
        return get_choices(self.Meta.model, self.fields)
    
    
def get_choices(model, fields):
    choices = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            choices[field.name] = field.choices
            if field.choices:
                choices[field.name] = [
                    {
                        "value": choice[0],
                        "label": choice[1],
                    }
                    for choice in field.choices
                ]
    logger.debug(choices)
    return choices


def get_verbose_names(model, fields):
    verbose_names = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            verbose_names[field.name] = field.verbose_name
    logger.debug(verbose_names)
    return verbose_names


def get_blank_fields(model, fields):
    blank_fields = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            blank_fields[field.name] = field.blank
    logger.debug(blank_fields)
    return blank_fields


def get_max_length(model, fields):
    max_length = {}
    for field in model._meta.get_fields():
        if field.name in fields:
            max_length[field.name] = field.max_length
    logger.debug(max_length)
    return max_length
