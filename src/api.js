function fetchearAPI(urlAPI) {
  // Esto de acá abajo solo sirve para cuando llegan al final,
  // en el inicio están los dos casos posibles a continuación
  if (urlAPI === null) {
    return false;
  }
  return fetch(urlAPI)
    .then((response) => response.json())
    .then((dataAPI) => dataAPI)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('SALTÓ UN ERROR:', error);
    });
}

export default async function manejarDataPokemones(input) {
  if (input.toString().match(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/[0-9]/)) {
    const dataPokemon = await fetchearAPI(input);
    return dataPokemon;
  }
  const dataAPI = await fetchearAPI(input);
  return dataAPI;
}
