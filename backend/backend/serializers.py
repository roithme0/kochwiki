from rest_framework import serializers
import logging

logger = logging.getLogger("django")

class MetaSerializer(serializers.Serializer):
    verbose_names = serializers.SerializerMethodField()
    blank_fields = serializers.SerializerMethodField()
    max_length = serializers.SerializerMethodField()
    choices = serializers.SerializerMethodField()

    def get_verbose_names(self, obj):
        verbose_names = {}
        for field in obj.__class__._meta.get_fields():
            if field.get_internal_type() in ["ForeignKey", "ManyToManyField"]:
                verbose_names[field.name] = None
                continue
            verbose_names[field.name] = field.verbose_name
        logger.debug(verbose_names)
        return verbose_names

    def get_choices(self, obj):
        choices = {}
        for field in obj.__class__._meta.get_fields():
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
        for field in obj.__class__._meta.get_fields():
            if field.get_internal_type() in ["ForeignKey", "ManyToManyField"]:
                blank_fields[field.name] = None
                continue
            blank_fields[field.name] = field.blank
        logger.debug(blank_fields)
        return blank_fields

    def get_max_length(self, obj):
        max_length = {}
        for field in obj.__class__._meta.get_fields():
            if not field.get_internal_type() == "CharField":
                max_length[field.name] = None
                continue
            max_length[field.name] = field.max_length     
        logger.debug(max_length)
        return max_length

