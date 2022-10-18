from django.shortcuts import render, get_object_or_404, redirect, reverse
from pokemon.models import Pokemon, Type, Location
import re
import requests
# Create your views here.

def get_pokemon(request):
    try:
        #list of every pokemon for autocomplete look up
        poke_list=['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina', 'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'clefairy', 'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat', 'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro', 'magnemite', 'magneton', 'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder', 'cloyster', 'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'krabby', 'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor', 'cubone', 'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing', 'weezing', 'rhyhorn', 'rhydon', 'chansey', 'tangela', 'kangaskhan', 'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'mr-mime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros', 'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon', 'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto', 'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres', 'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew', 'chikorita', 'bayleef', 'meganium', 'cyndaquil', 'quilava', 'typhlosion', 'totodile', 'croconaw', 'feraligatr', 'sentret', 'furret', 'hoothoot', 'noctowl', 'ledyba', 'ledian', 'spinarak', 'ariados', 'crobat', 'chinchou', 'lanturn', 'pichu', 'cleffa', 'igglybuff', 'togepi', 'togetic', 'natu', 'xatu', 'mareep', 'flaaffy', 'ampharos', 'bellossom', 'marill', 'azumarill', 'sudowoodo', 'politoed', 'hoppip', 'skiploom', 'jumpluff', 'aipom', 'sunkern', 'sunflora', 'yanma', 'wooper', 'quagsire', 'espeon', 'umbreon', 'murkrow', 'slowking', 'misdreavus', 'unown', 'wobbuffet', 'girafarig', 'pineco', 'forretress', 'dunsparce', 'gligar', 'steelix', 'snubbull', 'granbull', 'qwilfish', 'scizor', 'shuckle', 'heracross', 'sneasel', 'teddiursa', 'ursaring', 'slugma', 'magcargo', 'swinub', 'piloswine', 'corsola', 'remoraid', 'octillery', 'delibird', 'mantine', 'skarmory', 'houndour', 'houndoom', 'kingdra', 'phanpy', 'donphan', 'porygon2', 'stantler', 'smeargle', 'tyrogue', 'hitmontop', 'smoochum', 'elekid', 'magby', 'miltank', 'blissey', 'raikou', 'entei', 'suicune', 'larvitar', 'pupitar', 'tyranitar', 'lugia', 'ho-oh', 'celebi', 'treecko', 'grovyle', 'sceptile', 'torchic', 'combusken', 'blaziken', 'mudkip', 'marshtomp', 'swampert', 'poochyena', 'mightyena', 'zigzagoon', 'linoone', 'wurmple', 'silcoon', 'beautifly', 'cascoon', 'dustox', 'lotad', 'lombre', 'ludicolo', 'seedot', 'nuzleaf', 'shiftry', 'taillow', 'swellow', 'wingull', 'pelipper', 'ralts', 'kirlia', 'gardevoir', 'surskit', 'masquerain', 'shroomish', 'breloom', 'slakoth', 'vigoroth', 'slaking', 'nincada', 'ninjask', 'shedinja', 'whismur', 'loudred', 'exploud', 'makuhita', 'hariyama', 'azurill', 'nosepass', 'skitty', 'delcatty', 'sableye', 'mawile', 'aron', 'lairon', 'aggron', 'meditite', 'medicham', 'electrike', 'manectric', 'plusle', 'minun', 'volbeat', 'illumise', 'roselia', 'gulpin', 'swalot', 'carvanha', 'sharpedo', 'wailmer', 'wailord', 'numel', 'camerupt', 'torkoal', 'spoink', 'grumpig', 'spinda', 'trapinch', 'vibrava', 'flygon', 'cacnea', 'cacturne', 'swablu', 'altaria', 'zangoose', 'seviper', 'lunatone', 'solrock', 'barboach', 'whiscash', 'corphish', 'crawdaunt', 'baltoy', 'claydol', 'lileep', 'cradily', 'anorith', 'armaldo', 'feebas', 'milotic', 'castform', 'kecleon', 'shuppet', 'banette', 'duskull', 'dusclops', 'tropius', 'chimecho', 'absol', 'wynaut', 'snorunt', 'glalie', 'spheal', 'sealeo', 'walrein', 'clamperl', 'huntail', 'gorebyss', 'relicanth', 'luvdisc', 'bagon', 'shelgon', 'salamence', 'beldum', 'metang', 'metagross', 'regirock', 'regice', 'registeel', 'latias', 'latios', 'kyogre', 'groudon', 'rayquaza', 'jirachi', 'deoxys-normal', 'turtwig', 'grotle', 'torterra', 'chimchar', 'monferno', 'infernape', 'piplup', 'prinplup', 'empoleon', 'starly', 'staravia', 'staraptor', 'bidoof', 'bibarel', 'kricketot', 'kricketune', 'shinx', 'luxio', 'luxray', 'budew', 'roserade', 'cranidos', 'rampardos', 'shieldon', 'bastiodon', 'burmy', 'wormadam-plant', 'mothim', 'combee', 'vespiquen', 'pachirisu', 'buizel', 'floatzel', 'cherubi', 'cherrim', 'shellos', 'gastrodon', 'ambipom', 'drifloon', 'drifblim', 'buneary', 'lopunny', 'mismagius', 'honchkrow', 'glameow', 'purugly', 'chingling', 'stunky', 'skuntank', 'bronzor', 'bronzong', 'bonsly', 'mime-jr', 'happiny', 'chatot', 'spiritomb', 'gible', 'gabite', 'garchomp', 'munchlax', 'riolu', 'lucario', 'hippopotas', 'hippowdon', 'skorupi', 'drapion', 'croagunk', 'toxicroak', 'carnivine', 'finneon', 'lumineon', 'mantyke', 'snover', 'abomasnow', 'weavile', 'magnezone', 'lickilicky', 'rhyperior', 'tangrowth', 'electivire', 'magmortar', 'togekiss', 'yanmega', 'leafeon', 'glaceon', 'gliscor', 'mamoswine', 'porygon-z', 'gallade', 'probopass', 'dusknoir', 'froslass', 'rotom', 'uxie', 'mesprit', 'azelf', 'dialga', 'palkia', 'heatran', 'regigigas', 'giratina-altered', 'cresselia', 'phione', 'manaphy', 'darkrai', 'shaymin-land', 'arceus', 'victini', 'snivy', 'servine', 'serperior', 'tepig', 'pignite', 'emboar', 'oshawott', 'dewott', 'samurott', 'patrat', 'watchog', 'lillipup', 'herdier', 'stoutland', 'purrloin', 'liepard', 'pansage', 'simisage', 'pansear', 'simisear', 'panpour', 'simipour', 'munna', 'musharna', 'pidove', 'tranquill', 'unfezant', 'blitzle', 'zebstrika', 'roggenrola', 'boldore', 'gigalith', 'woobat', 'swoobat', 'drilbur', 'excadrill', 'audino', 'timburr', 'gurdurr', 'conkeldurr', 'tympole', 'palpitoad', 'seismitoad', 'throh', 'sawk', 'sewaddle', 'swadloon', 'leavanny', 'venipede', 'whirlipede', 'scolipede', 'cottonee', 'whimsicott', 'petilil', 'lilligant', 'basculin-red-striped', 'sandile', 'krokorok', 'krookodile', 'darumaka', 'darmanitan-standard', 'maractus', 'dwebble', 'crustle', 'scraggy', 'scrafty', 'sigilyph', 'yamask', 'cofagrigus', 'tirtouga', 'carracosta', 'archen', 'archeops', 'trubbish', 'garbodor', 'zorua', 'zoroark', 'minccino', 'cinccino', 'gothita', 'gothorita', 'gothitelle', 'solosis', 'duosion', 'reuniclus', 'ducklett', 'swanna', 'vanillite', 'vanillish', 'vanilluxe', 'deerling', 'sawsbuck', 'emolga', 'karrablast', 'escavalier', 'foongus', 'amoonguss', 'frillish', 'jellicent', 'alomomola', 'joltik', 'galvantula', 'ferroseed', 'ferrothorn', 'klink', 'klang', 'klinklang', 'tynamo', 'eelektrik', 'eelektross', 'elgyem', 'beheeyem', 'litwick', 'lampent', 'chandelure', 'axew', 'fraxure', 'haxorus', 'cubchoo', 'beartic', 'cryogonal', 'shelmet', 'accelgor', 'stunfisk', 'mienfoo', 'mienshao', 'druddigon', 'golett', 'golurk', 'pawniard', 'bisharp', 'bouffalant', 'rufflet', 'braviary', 'vullaby', 'mandibuzz', 'heatmor', 'durant', 'deino', 'zweilous', 'hydreigon', 'larvesta', 'volcarona', 'cobalion', 'terrakion', 'virizion', 'tornadus-incarnate', 'thundurus-incarnate', 'reshiram', 'zekrom', 'landorus-incarnate', 'kyurem', 'keldeo-ordinary', 'meloetta-aria', 'genesect', 'chespin', 'quilladin', 'chesnaught', 'fennekin', 'braixen', 'delphox', 'froakie', 'frogadier', 'greninja', 'bunnelby', 'diggersby', 'fletchling', 'fletchinder', 'talonflame', 'scatterbug', 'spewpa', 'vivillon','litleo', 'pyroar', 'flabebe', 'floette', 'florges', 'skiddo', 'gogoat', 'pancham', 'pangoro', 'furfrou', 'espurr', 'meowstic-male', 'honedge', 'doublade', 'aegislash-shield', 'spritzee', 'aromatisse', 'swirlix', 'slurpuff', 'inkay', 'malamar', 'binacle', 'barbaracle', 'skrelp', 'dragalge', 'clauncher', 'clawitzer', 'helioptile', 'heliolisk', 'tyrunt', 'tyrantrum', 'amaura', 'aurorus', 'sylveon', 'hawlucha', 'dedenne', 'carbink', 'goomy', 'sliggoo', 'goodra', 'klefki', 'phantump', 'trevenant', 'pumpkaboo-average', 'gourgeist-average', 'bergmite', 'avalugg', 'noibat', 'noivern', 'xerneas', 'yveltal', 'zygarde-50', 'diancie', 'hoopa', 'volcanion', 'rowlet', 'dartrix', 'decidueye', 'litten', 'torracat', 'incineroar', 'popplio', 'brionne', 'primarina', 'pikipek', 'trumbeak', 'toucannon', 'yungoos', 'gumshoos', 'grubbin', 'charjabug', 'vikavolt', 'crabrawler', 'crabominable', 'oricorio-baile', 'cutiefly', 'ribombee', 'rockruff', 'lycanroc-midday', 'wishiwashi-solo', 'mareanie', 'toxapex', 'mudbray', 'mudsdale', 'dewpider', 'araquanid', 'fomantis', 'lurantis', 'morelull', 'shiinotic', 'salandit', 'salazzle', 'stufful', 'bewear', 'bounsweet', 'steenee', 'tsareena', 'comfey', 'oranguru', 'passimian', 'wimpod', 'golisopod', 'sandygast', 'palossand', 'pyukumuku', 'type-null', 'silvally', 'minior-red-meteor', 'komala', 'turtonator', 'togedemaru', 'mimikyu-disguised', 'bruxish', 'drampa', 'dhelmise', 'jangmo-o', 'hakamo-o', 'kommo-o', 'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini', 'cosmog', 'cosmoem', 'solgaleo', 'lunala', 'nihilego', 'buzzwole', 'pheromosa', 'xurkitree', 'celesteela', 'kartana', 'guzzlord', 'necrozma', 'magearna', 'marshadow', 'poipole', 'naganadel', 'stakataka', 'blacephalon', 'zeraora', 'meltan', 'melmetal', 'grookey', 'thwackey', 'rillaboom', 'scorbunny', 'raboot', 'cinderace', 'sobble', 'drizzile', 'inteleon', 'skwovet', 'greedent', 'rookidee', 'corvisquire', 'corviknight', 'blipbug', 'dottler', 'orbeetle', 'nickit', 'thievul', 'gossifleur', 'eldegoss', 'wooloo', 'dubwool', 'chewtle', 'drednaw', 'yamper', 'boltund', 'rolycoly', 'carkol', 'coalossal', 'applin', 'flapple', 'appletun', 'silicobra', 'sandaconda', 'cramorant', 'arrokuda', 'barraskewda', 'toxel', 'toxtricity-amped', 'sizzlipede', 'centiskorch', 'clobbopus', 'grapploct', 'sinistea', 'polteageist', 'hatenna', 'hattrem', 'hatterene', 'impidimp', 'morgrem', 'grimmsnarl', 'obstagoon', 'perrserker', 'cursola', 'sirfetchd', 'mr-rime', 'runerigus', 'milcery', 'alcremie', 'falinks', 'pincurchin', 'snom', 'frosmoth', 'stonjourner', 'eiscue-ice', 'indeedee-male', 'morpeko-full-belly', 'cufant', 'copperajah', 'dracozolt', 'arctozolt', 'dracovish', 'arctovish', 'duraludon', 'dreepy', 'drakloak', 'dragapult', 'zacian', 'zamazenta', 'eternatus', 'kubfu', 'urshifu-single-strike', 'zarude', 'regieleki', 'regidrago', 'glastrier', 'spectrier', 'calyrex', 'wyrdeer', 'kleavor', 'ursaluna', 'basculegion-male', 'sneasler', 'overqwil', 'enamorus-incarnate']
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
        return render(request, 'pokemon/pokemon.html', {'all_pokemon':all_pokemon, 'poke_list': poke_list} )

    #error check if invalid name typed in
    except:
        return render(request, 'pokemon/error.html', {'all_pokemon':all_pokemon, "poke_list":poke_list} )

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
        return redirect (reverse('pokemon:get_pokemon'))