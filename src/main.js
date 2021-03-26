
$(function () {
    $('[data-toggle="popover"]').popover()
  })

  $('.popover-dismiss').popover({
    trigger: 'focus'
  })


function borrarPokemonesCargados() {

}

function manejarPaginador() {
    /*
    ACA PONER DOS PAGINAS NOMAS: "ANTERIOR" Y "SIGUIENTE" y armarla en base a eso

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
        
        document.querySelectorAll('a').forEach(($button, index) => {
            $button.id = dataAPI.results[index].url;
        })

        document.querySelectorAll('.card-img-top').forEach(($img, index) => {
            $img.src = `images/${index+1}.png` //ver como no usar index pero si algun ID de la API cosa de poder reutilizar la function
            $img.alt = `foto ${dataAPI.results[index].name}`
        })
    })
}

function mostrarDetallesPokemon($boton) {

    fetch($boton.id)
    .then(response => response.json())
    .then(dataAPI => {
        let popover = $($boton).data('bs.popover');

        let tiposPokemon = "";
        dataAPI.types.forEach((type, index) => {
            tiposPokemon += dataAPI.types[index].type.name
            
            if (index < (dataAPI.types.length - 1)) {
                tiposPokemon += " + "
            }
        })

        popover.config.title = dataAPI.name;
        popover.config.content = `<b>ID:</b> #${dataAPI.id}<br />
                                <b>Peso:</b> ${dataAPI.weight / 10} kgs.<br />
                                <b>Altura:</b> ${dataAPI.height / 10} m.<br />
                                <b>Tipo:</b> ${tiposPokemon}<br />
                                <b>HP:</b> ${dataAPI.stats[0].base_stat}<br />
                                <b>Ataque:</b> ${dataAPI.stats[1].base_stat}<br />
                                <b>Defensa:</b> ${dataAPI.stats[2].base_stat}<br />
                                <b>Ataque especial:</b> ${dataAPI.stats[3].base_stat}<br />
                                <b>Defensa especial:</b> ${dataAPI.stats[4].base_stat}<br />
                                <b>Velocidad:</b> ${dataAPI.stats[5].base_stat}<br />`;
        popover.config.html = true;
        popover.show();
    })
}

document.querySelectorAll('a').forEach($boton => {
    $boton.onclick = function() {
        mostrarDetallesPokemon($boton)
    };
})

armarHomePokemones();
