from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
    fieldsets = [
        (
            "Login",
            {
                "fields": ["username", "password"],
            },
        ),
        (
            "Gruppen & Berechtigungen",
            {
                "fields": ["groups", "user_permissions"],
            },
        ),
    ]
    filter_horizontal = ["groups", "user_permissions"]
    ordering = ["username"]
    search_fields = ["username"]
    search_help_text = "Nutzernamen suchen ..."


admin.site.register(User, UserAdmin)
