let previousPage = "";
let nextPage = "";

function iniciarControladorPopover() {  
    $(function () {
        $('[data-toggle="popover"]').popover()
    })

    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
}

function armarHomePokemones(urlAPI) {
    fetch(urlAPI)
    .then(response => response.json())
    .then(dataAPI => {

        previousPage = dataAPI.previous;
        nextPage = dataAPI.next;
        let indexURL = 0;

        if (urlAPI !== "https://pokeapi.co/api/v2/pokemon/") {
            indexURL = Number(urlAPI.match(/\d{2,4}/g)[0]); //globalmente todos los números entre 2 y 4 dígitos en el index "0"
        }

        document.querySelectorAll('.card-title').forEach(($title, index) => {
            $title.textContent = dataAPI.results[index].name;
        })
       
        if (urlAPI === "https://pokeapi.co/api/v2/pokemon/") {
            document.querySelector('#li-previous').className = "page-item disabled"
            document.querySelectorAll('.card-img-top').forEach(($img, index) => {
                $img.src = `images/${index+1}.png` //ver como no usar index pero si algun ID de la API cosa de poder reutilizar la function
                // $img.alt = `foto ${dataAPI.results[index].name}`
                // urlAPI.match(/\d{2}/g)[0];
            })
        }
        else if (urlAPI === "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"){
            document.querySelector('#li-previous').className = "page-item disabled"
            document.querySelectorAll('.card-img-top').forEach(($img, index) => {
                $img.src = `images/${index+1}.png` //ver como no usar index pero si algun ID de la API cosa de poder reutilizar la function
                // $img.alt = `foto ${dataAPI.results[index].name}`
                // urlAPI.match(/\d{2}/g)[0];
            })
        } else {
            document.querySelectorAll('.card-img-top').forEach(($img) => {
                document.querySelector('#li-previous').className = "page-item"
                $img.src = `images/${indexURL+1}.png` //ver como no usar index pero si algun ID de la API cosa de poder reutilizar la function
                // $img.alt = `foto ${dataAPI.results[indexURL].name}`
                indexURL += 1;
    
                // urlAPI.match(/\d{2}/g)[0];
            })
        }
        

        document.querySelectorAll('a').forEach(($button, index) => {
            $button.id = dataAPI.results[index].url;
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

iniciarControladorPopover();

armarHomePokemones('https://pokeapi.co/api/v2/pokemon/');

document.querySelector('#boton-previous').onclick = function() {
    armarHomePokemones(previousPage)
}

document.querySelector('#boton-next').onclick = function() {
    armarHomePokemones(nextPage)
}

document.querySelector('#boton-inicio').onclick = function() {
    armarHomePokemones('https://pokeapi.co/api/v2/pokemon/');
}
