from django.contrib.auth.models import BaseUserManager

from .utils.userdata import check_userdata


class CustomAccountManager(BaseUserManager):
    def create_user(self, username, password):
        check_userdata(username)

        user = self.model(username=username)
        user.set_password(password)

        user.save()
        return user

    def create_superuser(self, username, password):
        check_userdata(username)

        user = self.model(username=username)
        user.set_password(password)

        user.is_staff = True
        user.is_superuser = True

        user.save()
        return user
