from django.urls import path
from .views import viewGames, viewGame, createGame, updateGame, deleteGame
from . import views
# max do as_view() not as_view REMEMBER THE () PLEASE
urlpatterns = [
    path("view-game/<str:id>", views.viewGame, name="game"),
    path("view-games/", views.viewGames, name="games"),
    path("create-game/", views.createGame, name="create-game"),
    path("update-game/<str:id>", views.updateGame, name="update-game"),
    path("delete-game/<str:id>", views.deleteGame, name="update-game"),
]
