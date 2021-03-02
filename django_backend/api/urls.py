from django.urls import path
from .views import CreateGameView
# max do as_view() not as_view REMEMBER THE () PLEASE
urlpatterns = [
    path("view-all-games", CreateGameView.as_view()),
]
