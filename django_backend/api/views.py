from django.shortcuts import render
from rest_framework import generics, status
from .serializers import GameSerializer, CreateGameSerializer
from .models import Games
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse

def check_session(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()

# Create your views here.
@api_view(['GET'])
def viewGames(request):
    queryset = Games.objects.all()
    serializer = GameSerializer(queryset, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def viewGame(request, id):
    queryset = Games.objects.get(id=id)
    serializer = GameSerializer(queryset, many=False)
    return Response(serializer.data)



@api_view(['POST'])
def createGame(request):
    if not request.session.exists(request.session.session_key):
        request.session.create()
    host_id = request.session.session_key
    is_host_a_host = Games.objects.filter(host_id = host_id)
    if is_host_a_host.exists():
        return Response({'Bad Request': 'User already a host of a different room'}, status.HTTP_400_BAD_REQUEST)
    else:
        new_game = Games(host_id=host_id)
        new_game.save()
        return Response({'Game Created': 'Sucsess'}, status.HTTP_201_CREATED)
    return Response({'Bad Request': 'Invalid request'}, status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def updateGame(request, id):
    queryset = Games.objects.get(id=id)
    serializer = GameSerializer(instance=queryset, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
    else:
        print(serializer)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteGame(request, id):
    try: 
        queryset = Games.objects.get(id=id)
        queryset.delete()
        return Response("Item Deleted!")
    except:
        return Response("This room doesn't exist")