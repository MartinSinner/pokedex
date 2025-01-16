async function getPokemonData(pokemonId) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;            // all data from pokemon
    let response = await fetch(url);
    return await response.json();
}

async function getEvolutionChain(speciesUrl) {
    let speciesResponse = await fetch(speciesUrl);
    let speciesData = await speciesResponse.json();
    let evolutionChainUrl = speciesData.evolution_chain.url;

    let evolutionResponse = await fetch(evolutionChainUrl);
    return await evolutionResponse.json();
}