from django.db import models

# Create your models here.
# Create your models here.

class Type(models.Model):
    ptype=models.CharField(max_length=25, unique=True)
    no_effect=models.CharField(max_length=75, blank=True)
    super_effective_attack=models.CharField(max_length=75, blank=True)
    ineffective_attack=models.CharField(max_length=75, blank=True)
    weak_against=models.CharField(max_length=75, blank=True)
    strong_against=models.CharField(max_length=75, blank=True)
    no_damage=models.CharField(max_length=75, blank=True)

    def __str__(self):
        return self.ptype

class Location(models.Model):
    location=models.CharField(max_length=50000)

class Pokemon(models.Model):
    pname= models.CharField(max_length=100, unique=True)
    description=models.CharField(max_length=500)
    image_url=models.CharField(max_length=250)
    poke_type=models.ManyToManyField(Type, related_name='types')
    poke_location=models.ManyToManyField(Location, related_name='locations')

    def __str__(self):
        return self.pname
