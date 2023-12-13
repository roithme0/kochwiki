from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords
import logging


logger = logging.getLogger("django")


UNITS = [
    ("G", "g"),
    ("ML", "ml"),
    ("PIECE", "Stk."),
]


class Ingredient(models.Model):
    name = models.CharField(
        max_length=50,
        verbose_name="Name",
    )
    brand = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Marke",
    )
    unit = models.CharField(
        max_length=5, choices=UNITS, default="G", verbose_name="Einheit"
    )
    kcal = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        validators=[
            MaxValueValidator(999),
        ],
        verbose_name="Kalorien",
    )
    carbs = models.FloatField(
        blank=True,
        null=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(999),
        ],
        verbose_name="Kohlenhydrate",
    )
    protein = models.FloatField(
        blank=True,
        null=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(999),
        ],
        verbose_name="Protein",
    )
    fat = models.FloatField(
        blank=True,
        null=True,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(999),
        ],
        verbose_name="Fett",
    )

    history = HistoricalRecords()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["name", "brand"], name="unique_ingredient")
        ]

    def __str__(self):
        return self.name if not self.brand else self.name + " von " + self.brand