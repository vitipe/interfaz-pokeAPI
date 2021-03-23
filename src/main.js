
function cargarPokemones() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(response => response.json())
    .then(dataAPI => {

        document.querySelectorAll('.card-img-top').forEach((img, index) => {
            img.src = `images/${index+1}.png`
        })

        document.querySelectorAll('.card-title').forEach((title, index) => {
            title.textContent = dataAPI.results[index].name;
        })
    })


}

cargarPokemones();