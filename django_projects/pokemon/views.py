from django.shortcuts import render, get_object_or_404, redirect, reverse
from pokemon.models import Pokemon, Type, Location
import re
import requests
# Create your views here.
def get_pokemon(request):
    try:
        all_pokemon={}
        if 'name' in request.GET:
            name=request.GET['name']
            name=name.lower().strip() #desensitize input
            url='https://pokeapi.co/api/v2/pokemon-species/{}/'
            response=requests.get(url.format(name.lower()))
            data=response.json()
            for i in range(len(data['flavor_text_entries'])):
        #having to loop through all the key value pairs to find english because json is not consistent. Way to go API
                if 'en' in data['flavor_text_entries'][i]['language'].values():
                    idx=i #which index english occurs at
                    break
                else: continue
            description=' '.join(data['flavor_text_entries'][idx]['flavor_text'].split())
                # change of url for API

            url='https://pokeapi.co/api/v2/pokemon/{}/'
            response=requests.get(url.format(name))
            data=response.json()
            #name of type to query for unique constraint error
            type_name=[data['types'][i]['type']['name'] for i in range(len(data['types']))]
            #creation of type object
            type_data=Type(
            ptype=[data['types'][i]['type']['name'] for i in range(len(data['types']))]
          )
            #creation of pokemon object
            poke_data= Pokemon(
            pname= data['name'].title(),
            image_url=data['sprites']['other']['official-artwork']['front_default'],
            description=description
            )

            #creation of location object
            response=requests.get(url.format(name)+'/encounters')
            data=response.json()
            #dictionary pair that gets location and version name associated with location
            location={data[i]['location_area']['name']:data[i]['version_details'][0]['version']['name'] for i in range(len(data))}
            location_data=Location(location=location)
            location_data.save()
            # check to see if pokemon is not in database and type is not in database, tie them together
            if not Pokemon.objects.filter(pname=name.title()).exists() and not Type.objects.filter(ptype=type_name).exists():
                type_data.save()
                poke_data.save()
                poke_data.poke_type.add(type_data)
                poke_data.poke_location.add(location_data)

            #check to see if pokemon is not in database but the type is in the database
            elif not Pokemon.objects.filter(pname=name.title()).exists() and Type.objects.filter(ptype=type_name).exists():
                poke_data.save()
                poke_data.poke_type.add(Type.objects.get(ptype=type_name))
                poke_data.poke_location.add(location_data)


            all_pokemon=Pokemon.objects.filter(pname=name.title()).values()
        #poke_types=poke_data.poke_type.all()
        return render(request, 'pokemon/pokemon.html', {'all_pokemon':all_pokemon} )

    #error check if invalid name typed in
    except:
        return render(request, 'pokemon/error.html', {'all_pokemon':all_pokemon} )

def pokemon_detail(request, id):
    pokemon = get_object_or_404(Pokemon, id=id)
    qs_type=pokemon.poke_type.all().values()[0]['ptype']
    qs_location=pokemon.poke_location.all().values()[0]['location']
    poke_types=re.findall('[a-zA-Z]+', qs_type)
    unsorted_dic=eval(qs_location)
    poke_locations=dict(sorted(unsorted_dic.items(), key=lambda item: item[1]))
    print(pokemon)
    return render (
        request,
        'pokemon/pokemon_detail.html',
        {'pokemon': pokemon, "poke_types": poke_types, "poke_locations": poke_locations }
    )

def type_chart(request,element):
    try:
        effect={}
        name=element
        url='https://pokeapi.co/api/v2/type/{}/'
        response=requests.get(url.format(name))
        data=response.json()
        type_table= Type (
            ptype=data['name'],
            no_effect=', '.join([data['damage_relations']['no_damage_to'][j]['name'] for j in range(len(data['damage_relations']['no_damage_to']))]),
            super_effective_attack=', '.join([data['damage_relations']['double_damage_to'][j]['name'] for j in range(len(data['damage_relations']['double_damage_to']))]),
            ineffective_attack=', '.join([data['damage_relations']['half_damage_to'][j]['name'] for j in range(len(data['damage_relations']['half_damage_to']))]),
            weak_against=', '.join([data['damage_relations']['double_damage_from'][j]['name'] for j in range(len(data['damage_relations']['double_damage_from']))]),
            strong_against=', '.join([data['damage_relations']['half_damage_from'][j]['name'] for j in range(len(data['damage_relations']['half_damage_from']))]),
            no_damage=', '.join([data['damage_relations']['no_damage_from'][j]['name'] for j in range(len(data['damage_relations']['no_damage_from']))]))

        # check to see if type is already in data
        if not Type.objects.filter(ptype=name).exists():
           type_table.save()
        effect=get_object_or_404(Type, ptype=name)
        return render (request, 'pokemon/effect_chart.html', {"effect": effect})
    except:
        return redirect (reverse('get_pokemon'))
