export default function fetchearAPI(urlAPI) {
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
      console.error('HUBO ERROR:', error);
    });
}
