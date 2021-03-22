
function fetcheaLaAPI() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(dataAPI => {
        console.log(dataAPI.results)
    })
}

fetcheaLaAPI()

function cargarPokemones() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(dataAPI => {
        dataAPI.results.forEach(pokemon => {
            console.log(pokemon.name, pokemon.url)
        })


        document.querySelectorAll('.card-title').forEach((title, index) => {
            title.textContent = dataAPI.results[index].name;
        })

        
    })


}

cargarPokemones();