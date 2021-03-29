let anteriorPagina = "";
let siguientePagina = "";

function iniciarControladorPopover() {
    //Con esto hace que se inicialicen todos los popovers.
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    //Con esto el popover se cierra cuando se clickea en cualquier parte afuera del popover, si no quedaría siempre abierto
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
}

function armarHomePokemones(urlAPI) {
    fetch(urlAPI)
    .then(response => response.json())
    .then(dataAPI => {
        anteriorPagina = dataAPI.previous;
        siguientePagina = dataAPI.next;
        let indexPokemonPagina;

        if (urlAPI !== "https://pokeapi.co/api/v2/pokemon/") {
            //Globalmente todos los números entre 2 y 4 dígitos en el index "0".
            indexPokemonPagina = Number(urlAPI.match(/\d{2,4}/g)[0]); 
        }

        document.querySelectorAll('.card-title').forEach(($title, index) => {
            $title.textContent = mayusculaPrimerLetra(dataAPI.results[index].name);
        })
       
        if (urlAPI === "https://pokeapi.co/api/v2/pokemon/") {
            document.querySelector('#li-previous').className = "page-item disabled"
            document.querySelectorAll('.card-img-top').forEach(($img, index) => {
                //A lo que es la primer página se puede usar un index predeterminado desde "0".
                $img.src = `images/${index+1}.png`
            })
        }
        else if (urlAPI === "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"){
            //En el caso de que el usuario aprete siguiente y vuelva a la primer página, cambia el link del "home".
            document.querySelector('#li-previous').className = "page-item disabled"
            document.querySelectorAll('.card-img-top').forEach(($img, index) => {
                $img.src = `images/${index+1}.png`
            })
        } else {
            document.querySelectorAll('.card-img-top').forEach(($img) => {
                document.querySelector('#li-previous').className = "page-item"
                $img.src = `images/${indexPokemonPagina+1}.png`
                // $img.alt = `foto ${dataAPI.results[indexPokemonPagina].name}`; ESTO NO ANDA.
                indexPokemonPagina += 1;
            })
        }
        //Recorre el array de pokemones de la API y le saca el URL a cada uno para usarlo como link al apretar "Detalles"
        document.querySelectorAll('a').forEach(($botonDetalles, index) => {
            $botonDetalles.target = dataAPI.results[index].url; //No estoy seguro si el target es el lugar para alojar este tipo de enlaces.
        })  
    })
}

function mostrarDetallesPokemon($pokemonClickeado) {
    fetch($pokemonClickeado.target)
    .then(response => response.json())
    .then(dataAPI => {
        let $popover = $($pokemonClickeado).data('bs.popover');
        let tiposPokemon = "";

        //A lo que un pokemon puede tener más de un "type" es necesario concatenar los que tenga:
        dataAPI.types.forEach((type, index) => {
            tiposPokemon += dataAPI.types[index].type.name
            
            //Para que sólo agregue un "+" entre palabras y no al final del string:
            if (index < (dataAPI.types.length - 1)) {
                tiposPokemon += " + ";
            }
        })
        $popover.config.title = mayusculaPrimerLetra(dataAPI.name) ;
        $popover.config.content = `<b>ID:</b> #${dataAPI.id}<br />
                                <b>Peso:</b> ${dataAPI.weight / 10} kgs.<br />
                                <b>Altura:</b> ${dataAPI.height / 10} m.<br />
                                <b>Tipo:</b> ${mayusculaPrimerLetra(tiposPokemon)}<br />
                                <b>HP:</b> ${dataAPI.stats[0].base_stat}<br />
                                <b>Ataque:</b> ${dataAPI.stats[1].base_stat}<br />
                                <b>Defensa:</b> ${dataAPI.stats[2].base_stat}<br />
                                <b>Ataque especial:</b> ${dataAPI.stats[3].base_stat}<br />
                                <b>Defensa especial:</b> ${dataAPI.stats[4].base_stat}<br />
                                <b>Velocidad:</b> ${dataAPI.stats[5].base_stat}<br />`;
        $popover.config.html = true; //Necesario para que no tome los elementos html de arriba como parte del string
        $popover.show();//Para que el popover se abra con la data actualizada y no haya que clickear dos veces. 
        //Necesario el "focus" ya que si no no se cierra. 
    })
}

function manejarPaginador() {
    document.querySelector('#boton-previous').onclick = function() {
        armarHomePokemones(anteriorPagina)
    }
    
    document.querySelector('#boton-next').onclick = function() {
        armarHomePokemones(siguientePagina)
    }
    
    document.querySelector('#boton-inicio').onclick = function() {
        armarHomePokemones('https://pokeapi.co/api/v2/pokemon/');
    }
}

function mayusculaPrimerLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.querySelectorAll('a').forEach($botonDetalles => {
    $botonDetalles.onclick = function() {
        mostrarDetallesPokemon($botonDetalles)
    };
})

iniciarControladorPopover();

armarHomePokemones('https://pokeapi.co/api/v2/pokemon/');

manejarPaginador();