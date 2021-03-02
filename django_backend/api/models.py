from django.db import models
import uuid 

def generate_room_code():
    return uuid.uuid4().hex[:5].upper()

# Create your models here.
class Games(models.Model):
    room_code = models.CharField(max_length=6, default=generate_room_code, unique=True)
    host_id = models.CharField(max_length=50, unique=True)