from django.test import TestCase, Client
from django.urls import reverse
from pokemon.models import Pokemon, Type

class TestViews(TestCase):

    def setUp(self):
        self.client=Client()
        self.pokemon_url=reverse('pokemon:get_pokemon')

        self.poke=Pokemon.objects.create(
            pk=1,
            pname='charmander',
            description='some test desc')

        self.t= Type.objects.create(
            ptype='water',
            no_effect='')

    def test_get_pokemon(self):

        response=self.client.get(self.pokemon_url)

        self.assertEquals(response.status_code,200)
        self.assertTemplateUsed(response, 'pokemon/pokemon.html')
        self.assertEquals(self.poke.pname, 'charmander')
        self.assertEquals(self.poke.description, 'some test desc')
        self.assertEquals(self.t.ptype, 'water')
        self.assertEquals(self.t.no_effect, '')
