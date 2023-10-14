from django import forms

from .models import Ingredient, Amount, Step, Recipe


class IngredientCreateForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = "__all__"
        widgets = {
            "unit": forms.RadioSelect,
        }


class IngredientUpdateSingleForm(forms.ModelForm):
    class Meta:
        model = Ingredient
        fields = "__all__"
        widgets = {
            "unit": forms.RadioSelect,
        }


class AmountCreateForm(forms.ModelForm):
    class Meta:
        model = Amount
        fields = ["index", "ingredient", "amount"]
        widgets = {
            "index": forms.HiddenInput(attrs={"class": "index"}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["ingredient"].empty_label = ""


class StepCreateForm(forms.ModelForm):
    class Meta:
        model = Step
        fields = ["index", "description"]
        widgets = {
            "index": forms.HiddenInput(attrs={"class": "index"}),
        }


class RecipeEditForm(forms.ModelForm):
    class Meta:
        model = Recipe
        fields = [
            "name",
            "preptime",
            "servings",
            "origin_name",
            "origin_url",
            "original",
            "image",
        ]
