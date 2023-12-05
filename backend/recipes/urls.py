from django.urls import path
from django.urls.conf import include

from .views.recipeViews import (
    CreateRecipeView, 
    RetrieveUpdateRecipeView, 
    DestroyRecipeView, 
    RetrieveRecipeView,
    ListRecipesView, 
)

app_name = "recipes"

urlpatterns = [
    path(
        "create",
        CreateRecipeView.as_view(),
        name="recipe-create",
    ),
    path(
        "update/<int:pk>",
        RetrieveUpdateRecipeView.as_view(),
        name="recipe-update",
    ),
    path(
        "delete/<int:pk>",
        DestroyRecipeView.as_view(),
        name="recipe-delete",
    ),
    path("<int:pk>", RetrieveRecipeView.as_view(), name="recipe"),
    path("", ListRecipesView.as_view(), name="recipes"),
]
