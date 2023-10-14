from django.shortcuts import render

from .models import User
from .serializer import UserSerializer

from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response


class UserView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
