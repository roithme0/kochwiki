from django.urls import path

from .views import (
    CreateIngredientView,
    UpdateIngredientView,
    IngredientView,
    IngredientsView,
    RecipesView,
)

app_name = "recipes"

urlpatterns = [
    path(
        "ingredient/create/", CreateIngredientView.as_view(), name="ingredient-create"
    ),
    path(
        "ingredient/update/<int:pk>/",
        UpdateIngredientView.as_view(),
        name="ingredient-update",
    ),
    path("ingredient/<int:pk>/", IngredientView.as_view(), name="ingredient"),
    path("ingredients/", IngredientsView.as_view(), name="ingredients"),
    path("recipes/", RecipesView.as_view(), name="recipes"),
]
