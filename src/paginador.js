export default function manejarPaginador() {
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
  