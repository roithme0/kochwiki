from django.shortcuts import render

from .models import User
from .serializer import UserSerializer

from rest_framework.generics import ListCreateAPIView


# class UserView(ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
