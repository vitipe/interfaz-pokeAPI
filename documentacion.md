## Interfaz PokeAPI

#Tarea:

1. Construir un pokedex https://pokeapi.co/
2. Consultar documentación https://pokeapi.co/docs/v2.html#
3. Listar pokemones, y poder cambiar de página
4. Ver detalles de 1 pokemón, incluyendo al menos 1 foto.

## Llamados a la API

Primero un llamado para armar el paginador, cargando los primeros 20 pokemones (esto último se puede modificar para que sean más por página)
Los pokemones se pueden presentar en una lista o directamente en "Cards" de bootstrap.
Luego, al hacer click en un pokemon particular de la lista, abrir una nueva ¿tarjeta? con información y una foto del pokemon.

[] Agregar un loop que le de un id "boton-${nombrepokemon}" a cada boton por cada pokemon, cosa que al ser clickeado tome ese 
    para el fecth a la API.
[] Agregar en base al fetch la cantidad de pokemones (como para marcar que hay 1118)
[] Me gustaría armar un input donde agregues el pokemon y te salga una página con toda la info como ese ejemplo que había visto en react
[] Poner la primera letra de los nombres de los pokemón en mayúscula


25/3/21
-Ver si usar popovers es la estrategia correcta. Por lo visto se hacen on the fly y no es tan facil de editar como parecia.
-La otra es ver de crear un innerHTML con todo el contenido entero y mandarlo y fue