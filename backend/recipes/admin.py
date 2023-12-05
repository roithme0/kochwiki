from django.contrib import admin

from simple_history.admin import SimpleHistoryAdmin

from .models.recipeModel import Recipe
from .models.stepModel import  Step
from .models.amountModel import Amount


class AmountAdmin(SimpleHistoryAdmin):
    ordering = ["ingredient"]
    search_fields = ["ingredient"]
    search_help_text = "Zutat suchen ..."


class AmountTabluarInline(admin.TabularInline):
    model = Amount
    extra = 1


class StepAdmin(SimpleHistoryAdmin):
    search_fields = ["description"]
    search_help_text = "Beschreibung suchen ..."


class StepTabularInline(admin.TabularInline):
    model = Step
    extra = 1


class RecipeAdmin(SimpleHistoryAdmin):
    fieldsets = [
        (
            "",
            {
                "fields": ["name", "image", "origin_name", "origin_url", "original"],
            },
        ),
        (
            "Zutaten",
            {
                "fields": ["servings"],
            },
        ),
        (
            "Zubereitung",
            {
                "fields": ["preptime"],
            },
        ),
    ]
    inlines = [AmountTabluarInline, StepTabularInline]
    ordering = ["name"]
    search_fields = ["name", "amounts", "origin_name"]
    search_help_text = "Name, Zutaten oder Ersteller*in suchen ..."


admin.site.register(Amount, AmountAdmin)
admin.site.register(Step, StepAdmin)
admin.site.register(Recipe, RecipeAdmin)
