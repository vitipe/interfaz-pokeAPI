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

async function inicializar() {
  ui.iniciarControladorPopover();
  ui.armarHomePokemones('https://pokeapi.co/api/v2/pokemon/', await manejarDataPokemones('https://pokeapi.co/api/v2/pokemon/'));
  ui.manejarPaginador();
  asignarBotonDetalles();
}

inicializar();
