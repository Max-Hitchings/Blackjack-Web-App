from django.shortcuts import render
from rest_framework import generics, status
from .serializers import GameSerializer
from .models import Games
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
class CreateGameView(generics.ListAPIView):
    queryset = Games.objects.all()
    serializer_class = GameSerializer