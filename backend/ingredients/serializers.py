from .models import Ingredient
from rest_framework import serializers
import logging

logger = logging.getLogger("django")

class AddIngredientSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["kcal", "carbs", "protein", "fat"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

    # def validate(self, data):
    #     # rest framework cannot validate unique constraint: https://github.com/encode/django-rest-framework/issues/7173
    #     logger.warning(data)
    #     return data

    def validate(self, data):
        queryset = Ingredient.objects.all()
        if queryset.filter(name=data["name"], brand=data["brand"]).exists():
            raise serializers.ValidationError("Diese Zutat existiert bereits.")
        return data

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

class EditIngredientSerializer(serializers.ModelSerializer):
    field_errors = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"
        read_only_fields = ["id"]

    def to_internal_value(self, data):
        # replace empty strings with None to fit the model
        makro_fields = ["kcal", "carbs", "protein", "fat"]
        fixedData = data.copy()
        for field in makro_fields:
            if fixedData.get(field) == "":
                fixedData[field] = None
        return super().to_internal_value(fixedData)

    # def validate(self, data):
    #     # rest framework cannot validate unique constraint: https://github.com/encode/django-rest-framework/issues/7173
    #     logger.warning(data)
    #     return data

    def validate(self, data):
        queryset = Ingredient.objects.exclude(pk=self.instance.pk)
        if queryset.filter(name=data["name"], brand=data["brand"]).exists():
            raise serializers.ValidationError("Diese Zutat existiert bereits.")
        return data

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

class IngredientMetaSerializer(serializers.Serializer):
    verbose_names = serializers.SerializerMethodField()
    blank_fields = serializers.SerializerMethodField()
    max_length = serializers.SerializerMethodField()
    choices = serializers.SerializerMethodField()

    def get_verbose_names(self, obj):
        verbose_names = {}
        for field in Ingredient._meta.get_fields():
            if field.get_internal_type() in ["ForeignKey", "ManyToManyField"]:
                verbose_names[field.name] = None
                continue
            verbose_names[field.name] = field.verbose_name
        logger.debug(verbose_names)
        return verbose_names

    def get_choices(self, obj):
        choices = {}
        for field in Ingredient._meta.get_fields():
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

    def get_blank_fields(self, obj):
        blank_fields = {}
        for field in Ingredient._meta.get_fields():
            if field.get_internal_type() in ["ForeignKey", "ManyToManyField"]:
                blank_fields[field.name] = None
                continue
            blank_fields[field.name] = field.blank
        logger.debug(blank_fields)
        return blank_fields

    def get_max_length(self, obj):
        max_length = {}
        for field in Ingredient._meta.get_fields():
            if not field.get_internal_type() == "CharField":
                max_length[field.name] = None
                continue
            max_length[field.name] = field.max_length     
        logger.debug(max_length)
        return max_length

class IngredientSerializer(serializers.ModelSerializer):
    meta_data = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = "__all__"
        
    def get_meta_data(self, obj):
        meta_data = IngredientMetaSerializer(obj).data
        return meta_data
