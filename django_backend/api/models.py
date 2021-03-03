from django.db import models
import uuid

def generate_game_code():
    #new_code = uuid.uuid4().hex[:5].upper()
    #if Games.objects.filter(game_code=new_code).count() == 0:
    #    return new_code
    #generate_game_code()
    return uuid.uuid4().hex[:5].upper()

default_cards = [""]
# Create your models here.
class Games(models.Model):
    game_code = models.CharField(max_length=6, default=generate_game_code, unique=True)
    host_id = models.CharField(max_length=50, unique=True)
    cards = models.CharField(max_length=255, unique=False, default=default_cards)