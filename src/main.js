import * as ui from './ui.js';
import manejarDataPokemones from './api.js';

function asignarBotonDetalles() {
  document.querySelectorAll('a').forEach(($botonDetalles) => {
    $botonDetalles.onclick = async function () {
      ui.mostrarDetallesPokemon(ui.manejarPopover($botonDetalles),
        await manejarDataPokemones($botonDetalles.dataset.url));
    };
  });
}

function manejarPaginador() {
  document.querySelector('#boton-previous').onclick = async function () {
    ui.armarHomePokemones(ui.anteriorPagina, await manejarDataPokemones(ui.anteriorPagina));
  };

  document.querySelector('#boton-next').onclick = async function () {
    ui.armarHomePokemones(ui.siguientePagina, await manejarDataPokemones(ui.siguientePagina));
  };

  document.querySelector('#boton-inicio').onclick = async function () {
    ui.armarHomePokemones('https://pokeapi.co/api/v2/pokemon/', await manejarDataPokemones('https://pokeapi.co/api/v2/pokemon/'));
  };
}

async function inicializar() {
  ui.iniciarControladorPopover();
  ui.armarHomePokemones('https://pokeapi.co/api/v2/pokemon/', await manejarDataPokemones('https://pokeapi.co/api/v2/pokemon/'));
  manejarPaginador();
  asignarBotonDetalles();
}

inicializar();
