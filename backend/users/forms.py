from django.contrib.auth.forms import AuthenticationForm

from .models import User


class LoginForm(AuthenticationForm):
    error_messages = {
        "invalid_login": "Nutzername oder Passwort falsch.",
    }

    class Meta:
        model = User
