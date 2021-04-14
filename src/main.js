import * as ui from './ui.js';

function inicializar() {
  ui.iniciarControladorPopover();
  ui.armarHomePokemones('https://pokeapi.co/api/v2/pokemon/');
  ui.asignarBotonDetalles();
  ui.manejarPaginador();
}

inicializar();
