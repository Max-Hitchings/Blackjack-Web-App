from rest_framework import serializers
from .models import Games

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ('__all__')

class CreateGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ('host_id',)