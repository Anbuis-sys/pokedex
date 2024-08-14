const BASE_URL = "https://pokeapi.co/api/v2/";

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedData = await response.json();
        return parsedData;
    } catch (err) {
        console.error(err);
    }
};
const displayPokemon = (pokemon) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = `
    <div class="card">
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p>ID: ${pokemon.id}</p>
    <p>Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(`,`)}</p>
    </div>
    `;
};

document.getElementById("get-btn").addEventListener("click", async () => {
    const pokemonNameOrId = document.getElementById("pokemon-name").value.trim().toLowerCase();

    if(!pokemonNameOrId) {
        alert ("please enter a Pokemon name or Id");
        return;
    }

    const pokemon = await fetchPokemon(pokemonNameOrId);
    if (pokemon) {
    displayPokemon(pokemon);    
    localStorage.setItem("currentPokemonId", pokemon.id);
    console.log(pokemon.name);
    } else {
        alert("pokemon not found");
    }
});

document.getElementById("prev-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    if (currentPokemonId > 1) { 
    const newId = Math.max(1, currentPokemonId - 1);
    const pokemon = await fetchPokemon(newId);
    if (pokemon) {
        displayPokemon (pokemon);
    localStorage.setItem("currentPokemonId", pokemon.id);
    console.log(pokemon.name);
    }
}
});

document.getElementById("next-btn").addEventListener("click", async () => {
    const currentPokemonId = parseInt(localStorage.getItem("currentPokemonId"));
    const newId = currentPokemonId + 1;
    const pokemon = await fetchPokemon(newId);
    if (pokemon) {
        displayPokemon (pokemon);
    localStorage.setItem("currentPokemonId", pokemon.id);
    console.log(pokemon.name);
    }
});

fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
        title: "title 1",
        body: "lorem ipsum",
        userId: 1,
    })
})
.then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => console.error(err));
