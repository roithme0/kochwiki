from ..models.recipeModel import Recipe

from rest_framework import serializers
import logging


logger = logging.getLogger("django")


class AddRecipeSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["servings", "preptime"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

    def get_field_errors(self, obj):
        if hasattr(obj, "errors"):
            return obj.errors
        else:
            return {}

    def get_non_field_errors(self, obj):
        if hasattr(obj, "non_field_errors"):
            return obj.non_field_errors
        else:
            return []


class EditRecipeSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"
        read_only_fields = ["id"]

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["servings", "preptime"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

    def get_field_errors(self, obj):
        if hasattr(obj, "errors"):
            return obj.errors
        else:
            return {}

    def get_non_field_errors(self, obj):
        if hasattr(obj, "non_field_errors"):
            return obj.non_field_errors
        else:
            return []


class RecipeSerializer(serializers.ModelSerializer):
    verbose_names = serializers.SerializerMethodField()
    blank_fields = serializers.SerializerMethodField()
    max_length = serializers.SerializerMethodField()
    choices = serializers.SerializerMethodField()
    amounts = serializers.SerializerMethodField()
    steps = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = "__all__"

    def get_verbose_names(self, obj):
        return get_verbose_names(self.Meta.model)

    def get_blank_fields(self, obj):
        return get_blank_fields(self.Meta.model)

    def get_max_length(self, obj):
        return get_max_length(self.Meta.model)

    def get_choices(self, obj):
        return get_choices(self.Meta.model)
    
    def get_amounts(self, obj):
        return obj.amounts.values()
    
    def get_steps(self, obj):
        return obj.steps.values()
    
    
def get_choices(model):
    choices = {}
    for field in model._meta.get_fields():
        if not field.get_internal_type() == "CharField":
            choices[field.name] = None  
            continue
        if not field.choices:
            choices[field.name] = None
            continue
        choices[field.name] = [
            {
                "value": choice[0],
                "label": choice[1],
            }
            for choice in field.choices
        ]      
    logger.debug(choices)
    return choices


def get_verbose_names(model):
    verbose_names = {}
    for field in model._meta.get_fields():
        if field.get_internal_type() in ["ForeignKey", "ManyToManyField"]:
            verbose_names[field.name] = None
            continue
        verbose_names[field.name] = field.verbose_name
    logger.debug(verbose_names)
    return verbose_names


def get_blank_fields(model):
    blank_fields = {}
    for field in model._meta.get_fields():
        if field.get_internal_type() in ["ForeignKey", "ManyToManyField"]:
            blank_fields[field.name] = None
            continue
        blank_fields[field.name] = field.blank
    logger.debug(blank_fields)
    return blank_fields


def get_max_length(model):
    max_length = {}
    for field in model._meta.get_fields():
        if not field.get_internal_type() == "CharField":
            max_length[field.name] = None
            continue
        max_length[field.name] = field.max_length     
    logger.debug(max_length)
    return max_length
