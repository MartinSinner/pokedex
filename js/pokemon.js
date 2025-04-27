let limit = 40;
let offset = 0;
let isLoading = false;
let isSearchActive = false;

async function showPokemonList(offset, limit) {
    let pokemonContainer = document.getElementById('pokemonContainer');

    for (let i = offset + 1; i <= offset + limit; i++) {
        let pokemonData = await getPokemonData(i);
        pokemonList.push(pokemonData);
        
        let pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon');
        pokemonDiv.innerHTML = showPoki(pokemonData);
        pokemonDiv.onclick = () => showPokemonDetails(pokemonData);
        pokemonContainer.appendChild(pokemonDiv);         
    }
}

function navigatePokemon(direction) {
    let currentIndex = pokemonList.findIndex(pokemon => pokemon.id === currentPokemonId);

    if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + pokemonList.length) % pokemonList.length;
    }

    if (direction === 'next') {
        currentIndex = (currentIndex + 1 + pokemonList.length) % pokemonList.length;
    }

    let newPokemon = pokemonList[currentIndex];
    showPokemonDetails(newPokemon);
}

async function loadMorePokemon() {
    if (isLoading || isSearchActive) return;
    isLoading = true;

    showLoadingOverlay();

    await showPokemonList(offset, limit);
    offset += limit;

    hideLoadingOverlay();

    if (isSearchActive) {
        handleSearch();
    }

    isLoading = false;
}

function showLoadingOverlay() {
    let loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'flex';
}

function hideLoadingOverlay() {
    let loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'none';
}


window.onload = () => {
    showPokemonList(offset, limit);
    offset += limit;
};
