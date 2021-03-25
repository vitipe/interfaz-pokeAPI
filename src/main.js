

function mostrarDetallesPokemon() {
    //Armar con "popovers" de bootstrap, ver que necesita jQuery
    /*
    A mostrar:
    ID
    Tipo de pokemon
    Peso
    Altura
    Skills?
    Categoría
    Forma?
    Color?
    */
}

function borrarPokemonesCargados() {

}

function manejarPaginador() {
    /*

    Para armar el paginador, con cada página tengo que ir sumando 20 al offset.
    O sea,
    Pagina 1: https://pokeapi.co/api/v2/pokemon/?limit=20
    Pagina 2: https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20
    Página 3: https://pokeapi.co/api/v2/pokemon/?limit=20&offset=40
    Página 4: https://pokeapi.co/api/v2/pokemon/?limit=20&offset=60

    y así. La otra es que la misma API te tira:
    "next": "https://pokeapi.co/api/v2/ability/?offset=40&limit=20",
    "previous": "https://pokeapi.co/api/v2/ability/?offset=0&limit=20",
    Así que usar eso.

    Al cambiar de página tengo que:

    -Actualizar el paginador
    -Borrar los pokemones que se están viendo
    -Traer de la API la siguiente lista de pokemones
    -Actualizar las fotos, títulos y botones de los pokemones.
    */
}

function armarHomePokemones() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(dataAPI => {

        document.querySelectorAll('.card-title').forEach(($title, index) => {
            $title.textContent = dataAPI.results[index].name;
        })

        document.querySelectorAll('.card-img-top').forEach(($img, index) => {
            $img.src = `images/${index+1}.png` //ver como no usar index pero si algun ID de la API cosa de poder reutilizar la function
        })
        
        

        document.querySelectorAll('.btn').forEach(($boton, index) => {
            console.log(dataAPI.results[index].name)
            $boton.id = dataAPI.results[index].name;
        })
    })
}

armarHomePokemones();

$(function(){
    // Enables popover
    $("[data-toggle=popover]").popover();
});


/*
Ejemplo de estructura de popover

<a tabindex="0"
   class="btn btn-lg btn-primary" 
   role="button" 
   data-html="true" 
   data-toggle="popover" 
   data-trigger="focus" 
   title="<b>Example popover</b> - title" 
   data-content="<div><b>Example popover</b> - content</div><div><b>Example popover</b> - content</div>">Example popover</a>
*/