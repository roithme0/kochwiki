from django.urls import path

from .views import CreateIngredientView, IngredientsView, RecipesView

app_name = "recipes"

urlpatterns = [
    path("ingredient/create", CreateIngredientView.as_view(), name="ingredient-create"),
    path("ingredients/", IngredientsView.as_view(), name="ingredients"),
    path("recipes/", RecipesView.as_view(), name="recipes"),
]
