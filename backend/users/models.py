from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


from .managers import CustomAccountManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(
        unique=True,
        max_length=50,
        verbose_name="Nutzername",
    )
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = "username"

    def __str__(self):
        return self.username
