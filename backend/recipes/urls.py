from django.urls import path

from .views import IngredientView, RecipeView

app_name = "recipes"

urlpatterns = [
    path("ingredients/", IngredientView.as_view(), name="ingredients"),
    path("recipes/", RecipeView.as_view(), name="recipes"),
]
