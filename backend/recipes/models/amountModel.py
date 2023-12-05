from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from ingredients.models import Ingredient
from ..models.recipeModel import Recipe

from simple_history.models import HistoricalRecords
import logging


logger = logging.getLogger("django")


class Amount(models.Model):
    index = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(0),
        ],
        verbose_name="Index",
    )
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        related_name="amounts",
        verbose_name="Zutat",
    )
    amount = models.FloatField(
        validators=[
            MinValueValidator(0),
            MaxValueValidator(9999),
        ],
        verbose_name="Menge",
    )
    recipe = models.ForeignKey(
        Recipe,
        null=True,
        on_delete=models.CASCADE,
        related_name="amounts",
        verbose_name="Rezept",
    )

    history = HistoricalRecords()

    class Meta:
        ordering = ["index"]

    @property
    def unit(self):
        return self.ingredient.unit

    def __str__(self):
        return self.ingredient.name + ": " + str(self.amount) + " " + self.unit
