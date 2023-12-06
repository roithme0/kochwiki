from django.urls import path
from django.urls.conf import include

from .views import (
    CreateIngredientView,
    RetrieveUpdateIngredientView,
    DestroyIngredientView,
    RetrieveIngredientView,
    ListIngredientsView,
    EmptyIngredientView,
)

app_name = "ingredients"

urlpatterns = [
    path(
        "create",
        CreateIngredientView.as_view(),
        name="ingredient-create",
    ),
    path(
        "update/<int:pk>",
        RetrieveUpdateIngredientView.as_view(),
        name="ingredient-update",
    ),
    path(
        "delete/<int:pk>",
        DestroyIngredientView.as_view(),
        name="ingredient-delete",
    ),
    path("<int:pk>", RetrieveIngredientView.as_view(), name="ingredient"),
    path('empty', EmptyIngredientView.as_view(), name='empty-ingredient'),
    path("", ListIngredientsView.as_view(), name="ingredients"),
]
