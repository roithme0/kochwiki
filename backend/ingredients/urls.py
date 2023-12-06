from django.urls import path
from django.urls.conf import include

from .views import (
    CreateIngredientView,
    RetrieveUpdateIngredientView,
    DestroyIngredientView,
    RetrieveIngredientView,
    ListIngredientsView,
    IngredientMetaView,
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
    path('meta', IngredientMetaView.as_view(), name='ingredient-meta'),
    path("", ListIngredientsView.as_view(), name="ingredients"),
]
