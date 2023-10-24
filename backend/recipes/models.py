from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords
import logging


logger = logging.getLogger("django")


UNITS = [
    ("g", "g"),
    ("ml", "ml"),
    ("Stk.", "Stk."),
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
        max_length=4, choices=UNITS, default="g", verbose_name="Einheit"
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

    unique_together = ["name", "brand"]

    def __str__(self):
        return self.name if not self.brand else self.name + " von " + self.brand


class Recipe(models.Model):
    name = models.CharField(
        unique=True,
        max_length=200,
        verbose_name="Name",
    )
    servings = models.PositiveSmallIntegerField(
        default=2,
        blank=True,
        null=True,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(4),
        ],
        verbose_name="Portionen",
    )
    preptime = models.PositiveSmallIntegerField(
        blank=True,
        null=True,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(999),
        ],
        verbose_name="Zubereitungszeit",
    )
    origin_name = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name="Ersteller*in",
    )
    origin_url = models.URLField(
        blank=True,
        null=True,
        verbose_name="URL",
    )
    original = models.FileField(
        upload_to="recipes/files", blank=True, null=True, verbose_name="Original"
    )
    image = models.ImageField(
        upload_to="recipes/images",
        blank=True,
        null=True,
        verbose_name="Bild",
    )

    history = HistoricalRecords()

    @property
    def kcal(self) -> int:
        kcal = 0
        for amount in self.amounts.all():
            factor = self.get_factor(amount.ingredient)
            kcal += (
                (amount.ingredient.kcal * (amount.amount / factor))
                if amount.ingredient.kcal
                else 0
            )
        return int(kcal / self.servings)

    @property
    def carbs(self) -> int:
        carbs = 0
        for amount in self.amounts.all():
            factor = self.get_factor(amount.ingredient)
            carbs += (
                (amount.ingredient.carbs * (amount.amount / factor))
                if amount.ingredient.carbs
                else 0
            )
        return int(carbs / self.servings)

    @property
    def protein(self) -> int:
        protein = 0
        for amount in self.amounts.all():
            factor = self.get_factor(amount.ingredient)
            protein += (
                (amount.ingredient.protein * (amount.amount / factor))
                if amount.ingredient.protein
                else 0
            )
        return int(protein / self.servings)

    @property
    def fat(self) -> int:
        fat = 0
        for amount in self.amounts.all():
            factor = self.get_factor(amount.ingredient)
            fat += (
                (amount.ingredient.fat * (amount.amount / factor))
                if amount.ingredient.fat
                else 0
            )
        return int(fat / self.servings)

    def get_factor(self, ingredient: Ingredient) -> int:
        if ingredient.unit in ["g", "ml"]:
            return 100
        return 1

    def check_kcal(self) -> bool:
        for amount in self.amounts.all():
            if not amount.ingredient.kcal and amount.ingredient.kcal != 0:
                return False
        return True

    def __str__(self):
        return self.name


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
