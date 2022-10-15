from django.urls import path
from . import views


urlpatterns = [
    path('', views.get_pokemon, name='get_pokemon'),
    path('pokemon/<int:id>/',views.pokemon_detail, name='pokemon_detail'),
    path('<str:element>', views.type_chart, name='type_chart')
]
