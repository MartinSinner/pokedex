function showPokemonDetails(pokemonData) {
    let overlay = document.getElementById('overlay');
    let pokemonName = document.getElementById('pokemonName');
    let pokemonImage = document.getElementById('pokemonImage');

    overlay.style.display = "flex";
    pokemonName.textContent = pokemonData.name.toUpperCase();       //big letters
    pokemonImage.src = pokemonData.sprites.other["official-artwork"].front_default;     //without .src <img> empty 

    currentPokemonId = pokemonData.id;
    currentSpeciesUrl = pokemonData.species.url;
    document.querySelectorAll('.tabContent').forEach(tab => tab.innerHTML = "");

    showTab(currentTabName);
}

function closeOverlay() {
    document.getElementById('overlay').style.display = "none";
}

function handleOverlayClick() {
    closeOverlay();
}

function setActiveButton(currentTabName) {
    document.querySelectorAll('.tabs button').forEach(button => button.classList.remove('active'));

    let activeButton = document.querySelector(`.tabs button[onclick="showTab('${currentTabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function resetTabContent() {
    document.querySelectorAll('.tabContent').forEach(tab => {           //{} bc of more actions in arrow function 
        tab.innerHTML = "";
        tab.classList.remove('active');
    });
}

async function showTab(currentTabName) {

    setActiveButton(currentTabName);
    resetTabContent();

    let activeTab = document.getElementById(currentTabName);
    activeTab.classList.add('active');

    await loadTabContent(currentTabName, activeTab);
}


async function loadTabContent(currentTabName, activeTab) {
    activeTab.innerHTML = `<div class="loading">Loading...</div>`;       // loadindicator 

    if (currentTabName === 'info') {
        let pokemonData = await getPokemonData(currentPokemonId);
        await new Promise(resolve => setTimeout(resolve, 200));         //template.js
        activeTab.innerHTML = getInfoTab(pokemonData);
    }

    if (currentTabName === 'stats') {
        let pokemonData = await getPokemonData(currentPokemonId);
        await new Promise(resolve => setTimeout(resolve, 200));
        activeTab.innerHTML = getStatsTab(pokemonData);
    }

    if (currentTabName === 'evolution') {
        let evolutionData = await getEvolutionChain(currentSpeciesUrl);
        await new Promise(resolve => setTimeout(resolve, 200));
        activeTab.innerHTML = "";
        displayEvolutionChain(evolutionData.chain);
    }
}

async function displayEvolutionChain(chain) {
    let evolutionTab = document.getElementById('evolution');
    evolutionTab.innerHTML = "";

    let current = chain;

    while (current) {
        let name = current.species.name;
        let pokemonData = await getPokemonData(name);

        evolutionTab.innerHTML += createEvolutionStageHTML(pokemonData, name);

        if (current.evolves_to.length > 0) {            //proofs if there are more than one evoling stage
            evolutionTab.innerHTML += createEvolutionArrowHTML();

        }
        current = current.evolves_to[0];
    }
}

