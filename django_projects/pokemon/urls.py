from django.urls import path
from . import views

app_name='pokemon'
urlpatterns = [
    path('', views.get_pokemon, name='get_pokemon'),
    path('<int:id>',views.pokemon_detail, name='pokemon_detail'),
    path('<str:element>', views.type_chart, name='type_chart')
]
