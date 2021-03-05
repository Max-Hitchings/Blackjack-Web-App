from django.urls import path
from .views import viewGames, viewGame, createGame, updateGame, deleteGame, verifyGame
from . import views
from graphene_django.views import GraphQLView
from django.contrib import admin

urlpatterns = [
    path("view-game/<str:id>", views.viewGame, name="game"),
    path("view-games/", views.viewGames, name="games"),
    path("create-game/", views.createGame, name="create-game"),
    path("update-game/<str:id>", views.updateGame, name="update-game"),
    path("delete-game/<str:id>", views.deleteGame, name="update-game"),
    path("verify-game", views.verifyGame, name="verifyGame"),
    path("graphql", GraphQLView.as_view(graphiql=True)),
    path("admin/", admin.site.urls),
]
