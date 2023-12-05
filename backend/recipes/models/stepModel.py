from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from ..models.recipeModel import Recipe

from simple_history.models import HistoricalRecords
import logging


logger = logging.getLogger("django")


class Step(models.Model):
    index = models.PositiveSmallIntegerField(
        validators=[
            MinValueValidator(0),
            MaxValueValidator(99),
        ],
        verbose_name="Index",
    )
    description = models.TextField(
        max_length=200,
        verbose_name="Beschreibung",
    )
    recipe = models.ForeignKey(
        Recipe,
        null=True,
        on_delete=models.CASCADE,
        related_name="steps",
        verbose_name="Rezept",
    )

    history = HistoricalRecords()

    class Meta:
        ordering = ["index"]
