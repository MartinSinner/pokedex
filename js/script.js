let currentPokemonId = null;
let currentSpeciesUrl = null;
let pokemonList = [];
let allPokemon = [];
let currentTabName = 'info';


function scrollToFooter() {
    document.getElementById('footer').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    let searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = "";
        handleSearch();
    }
}

function getTypeColor(type) {
    const colors = {
        grass: "#78C850",
        fire: "#F08030",
        water: "#6890F0",
        bug: "#A8B820",
        normal: "#A8A878",
        poison: "#A040A0",
        electric: "#F8D030",
        ground: "#E0C068",
        fighting: "#C03028",
        psychic: "#F85888",
        rock: "#B8A038",
        ghost: "#705898",
        ice: "#98D8D8",
        dragon: "#7038F8",
        steel: "#B8B8D0",
        flying: "#A890F0",
        dark: "#705848",
        fairy: "#EE99AC"

    };
    return colors[type] || "#A8A878";
}

showPokemonList(40);










