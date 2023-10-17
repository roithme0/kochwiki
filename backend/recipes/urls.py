from django.urls import path

from .views import RecipeView

urlpatterns = [
    path("list/", RecipeView.as_view(), name="recipes-list"),
]
