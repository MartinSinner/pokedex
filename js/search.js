function handleSearch() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let allPokemonDivs = document.querySelectorAll(".pokemon");
    let loadMoreButton = document.getElementById("loadMoreButton");

    if (query.length < 3) {
        isSearchActive = false;
        resetSearch(allPokemonDivs, loadMoreButton);
        return;
    }

    isSearchActive = true; 
    let results = filterPokemon(query, allPokemonDivs);
    displayResults(results, loadMoreButton);
}


function filterPokemon(query, allPokemonDivs) {
    let results = [];
    allPokemonDivs.forEach(div => {
        let pokemonName = div.querySelector("h3").textContent.toLowerCase();
        if (pokemonName.includes(query)) {
            results.push(div);
        } else {
            div.style.display = "none";
        }
    });
    return results;
}


function displayResults(results, loadMoreButton) {
    results.slice(0, 10).forEach(div => div.style.display = "block");
    loadMoreButton.style.display = results.length > 10 ? "block" : "none";
}


function resetSearch(allPokemonDivs, loadMoreButton) {
    allPokemonDivs.forEach(div => div.style.display = "block");
    loadMoreButton.style.display = "block"; 
    isSearchActive = false; 
}

function toggleSearchBar() {
    let searchBar = document.querySelector('.searchBar');
    let searchInput = document.querySelector('.searchBar input');           //responsive

    if (searchBar.classList.contains('expanded')) {
        searchBar.classList.remove('expanded');
    } else {
        searchBar.classList.add('expanded');
        searchInput.focus();
    }
}