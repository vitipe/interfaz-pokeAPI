import manejarDataPokemones from './api.js';

let anteriorPagina = '';
let siguientePagina = '';

export function mayusculaPrimerLetra(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function iniciarControladorPopover() {
  // Con esto hace que se inicialicen todos los popovers.
  $(() => {
    $('[data-toggle="popover"]').popover();
  });
  // Con esto el popover se cierra cuando se clickea en cualquier parte afuera del popover,
  // si no quedaría siempre abierto
  $('.popover-dismiss').popover({
    trigger: 'focus',
  });
}
export function manejarPopover(popoverSeleccionado) {
  const $popover = $(popoverSeleccionado).data('bs.popover');
  return $popover;
}

export async function mostrarDetallesPokemon($popover, dataPokemon) {
  let tiposPokemon = '';
  // A lo que un pokemon puede tener más de un "type" es necesario concatenar los que tenga:
  dataPokemon.types.forEach((type, index) => {
    tiposPokemon += dataPokemon.types[index].type.name;

    // Para que sólo agregue un "+" entre palabras y no al final del string:
    if (index < (dataPokemon.types.length - 1)) {
      tiposPokemon += ' + ';
    }
  });
  $popover.config.title = mayusculaPrimerLetra(dataPokemon.name);
  $popover.config.content = `<b>ID:</b> #${dataPokemon.id}<br />
                              <b>Peso:</b> ${dataPokemon.weight / 10} kgs.<br />
                              <b>Altura:</b> ${dataPokemon.height / 10} m.<br />
                              <b>Tipo:</b> ${mayusculaPrimerLetra(tiposPokemon)}<br />
                              <b>HP:</b> ${dataPokemon.stats[0].base_stat}<br />
                              <b>Ataque:</b> ${dataPokemon.stats[1].base_stat}<br />
                              <b>Defensa:</b> ${dataPokemon.stats[2].base_stat}<br />
                              <b>Ataque especial:</b> ${dataPokemon.stats[3].base_stat}<br />
                              <b>Defensa especial:</b> ${dataPokemon.stats[4].base_stat}<br />
                              <b>Velocidad:</b> ${dataPokemon.stats[5].base_stat}<br />`;
  // Necesario para que no tome los elementos html de arriba como parte del string
  $popover.config.html = true;
  // Para que el popover se abra con la data actualizada y no haya que clickear dos veces.
  $popover.show();
  // Necesario el "focus" ya que si no no se cierra.
}

export function armarHomePokemones(urlAPI, dataAPI) {
  anteriorPagina = dataAPI.previous;
  siguientePagina = dataAPI.next;
  let indexPokemonPagina;

  if (urlAPI !== 'https://pokeapi.co/api/v2/pokemon/') {
  // Globalmente todos los números entre 2 y 4 dígitos en el index "0".
    indexPokemonPagina = Number(urlAPI.match(/\d{2,4}/g)[0]);
  }
  document.querySelectorAll('.card-title').forEach(($title, index) => {
    $title.textContent = mayusculaPrimerLetra(dataAPI.results[index].name);
  });

  if (urlAPI === 'https://pokeapi.co/api/v2/pokemon/') {
    document.querySelector('#li-previous').className = 'page-item disabled';
    document.querySelectorAll('.card-img-top').forEach(($img, index) => {
      // A lo que es la primer página se puede usar un index predeterminado desde "0".
      $img.src = `images/${index + 1}.png`;
    });
  } else if (urlAPI === 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20') {
    /*
        En el caso de que el usuario aprete siguiente y vuelva a la primer página,
        cambia el link del "home".
        */
    document.querySelector('#li-previous').className = 'page-item disabled';
    document.querySelectorAll('.card-img-top').forEach(($img, index) => {
      $img.src = `images/${index + 1}.png`;
    });
  } else {
    document.querySelectorAll('.card-img-top').forEach(($img) => {
      document.querySelector('#li-previous').className = 'page-item';
      $img.src = `images/${indexPokemonPagina + 1}.png`;
      // $img.alt = `foto ${dataAPI.results[indexPokemonPagina].name}`; ESTO NO ANDA.
      indexPokemonPagina += 1;
    });
  }
  // Recorre el array de pokemones de la API y le saca el URL a cada uno para usarlo
  // como link al apretar "Detalles"
  document.querySelectorAll('a').forEach(($botonDetalles, index) => {
    // No estoy seguro si el target es el lugar para alojar este tipo de enlaces.
    $botonDetalles.dataset.url = dataAPI.results[index].url;
  });
}

// Esto sería lo único que tendría que sacar de aca así no importo nada de api.js
export function manejarPaginador() {
  document.querySelector('#boton-previous').onclick = async function () {
    armarHomePokemones(anteriorPagina, await manejarDataPokemones(anteriorPagina));
  };

  document.querySelector('#boton-next').onclick = async function () {
    armarHomePokemones(siguientePagina, await manejarDataPokemones(siguientePagina));
  };

  document.querySelector('#boton-inicio').onclick = async function () {
    armarHomePokemones('https://pokeapi.co/api/v2/pokemon/', await manejarDataPokemones('https://pokeapi.co/api/v2/pokemon/'));
  };
}
