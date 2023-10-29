from django.urls import path
from django.urls.conf import include

from .views import (
    CreateRetrieveIngredientView,
    RetrieveUpdateRetrieveIngredientView,
    DestroyRetrieveIngredientView,
    RetrieveIngredientView,
    ListIngredientsView,
    ListRecipesView,
)

app_name = "recipes"

urlpatterns = [
    path(
        "ingredient/",
        include(
            [
                path(
                    "create/",
                    CreateRetrieveIngredientView.as_view(),
                    name="ingredient-create",
                ),
                path(
                    "update/<int:pk>/",
                    RetrieveUpdateRetrieveIngredientView.as_view(),
                    name="ingredient-update",
                ),
                path(
                    "delete/<int:pk>/",
                    DestroyRetrieveIngredientView.as_view(),
                    name="ingredient-delete",
                ),
                path("<int:pk>/", RetrieveIngredientView.as_view(), name="ingredient"),
            ]
        ),
    ),
    path("ingredients/", ListIngredientsView.as_view(), name="ingredients"),
    path("recipes/", ListRecipesView.as_view(), name="recipes"),
]
