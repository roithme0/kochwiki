from django.urls import path
from django.urls.conf import include

from .views import ListRecipesView

app_name = "recipes"

urlpatterns = [
    path("", ListRecipesView.as_view(), name="recipes"),
]
