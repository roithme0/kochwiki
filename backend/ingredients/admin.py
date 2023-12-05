from django.contrib import admin

from .models import Ingredient

from simple_history.admin import SimpleHistoryAdmin

class IngredientAdmin(SimpleHistoryAdmin):
    fieldsets = [
        (
            "Details",
            {
                "fields": ["name", "brand", "unit"],
            },
        ),
        (
            "Nährwerte",
            {
                "fields": ["kcal", "carbs", "protein", "fat"],
            },
        ),
    ]
    ordering = ["name"]
    search_fields = ["name"]
    search_help_text = "Namen suchen ..."
    
admin.site.register(Ingredient, IngredientAdmin)
    