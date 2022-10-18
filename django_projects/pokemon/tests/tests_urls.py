from django.test import SimpleTestCase
from django.urls import reverse, resolve
from pokemon.views import get_pokemon, pokemon_detail, type_chart
class TestUrls(SimpleTestCase):

    def test_get_pokemon(self):
        url= reverse('pokemon:get_pokemon')
        print(resolve(url))
        self.assertEquals(resolve(url).func, get_pokemon)

    def test_pokemon_detail(self):
        url= reverse('pokemon:pokemon_detail', args=[5])
        print(resolve(url))
        self.assertEquals(resolve(url).func, pokemon_detail)

    def test_type_chart(self):
        url= reverse('pokemon:type_chart', args=['some-str'])
        print(resolve(url))
        self.assertEquals(resolve(url).func, type_chart)
