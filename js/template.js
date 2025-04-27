function showPoki(pokemonData) {
    let typeIcons = generateTypeIcon(pokemonData.types)
    let type = pokemonData.types[0].type.name;
    return `
        <div class="pokemon type-${type}">            
            <h3> #${pokemonData.id} ${pokemonData.name.toUpperCase()}</h3>                       
            <img src="${pokemonData.sprites.other["official-artwork"].front_default}">
            <div class="type-icons">
                ${typeIcons}
            </div>
        </div>
        `;
}

function generateTypeIcon(types) {
    return types.map(type => `
            <div class="typeIcon">
                <img src="${getTypeIcon(type.type.name)}"             
            </div>`
    ).join("");          // connects all elements to a string 
}


function getInfoTab(pokemonData) {
    return `
    <div class="infoContainer">
        <div class="infoLabel">Height</div>
        <div class="infoValue">: ${(pokemonData.height / 10).toFixed(1)} m</div>
        <div class="infoLabel">Weight</div>
        <div class="infoValue">: ${(pokemonData.weight / 10).toFixed(1)} kg</div>
        <div class="infoLabel">Base Experience </div>
        <div class="infoValue">: ${pokemonData.base_experience}</div>
        <div class="infoLabel">Abilities</div>
        <div class="infoValue">: ${pokemonData.abilities.map(a => a.ability.name).join(", ")}</div>  
    </div>     
    `;
}

function getTypeIcon(type) {
    return `assets/icons/${type}.png`;
}

function getStatsTab(pokemonData) {
    return pokemonData.stats
        .map((stat, index) => {
            let labels = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];
            return `
            <div class="statBar">
                <span class="statBarLabel">${labels[index]}</span>
                <div class="statBarContainer">
                    <div class="statBarFill" style="width: ${Math.min(stat.base_stat / 255 * 100, 100)}%;"></div>
                </div>
            </div>
        `;
        }).join("");
}

function createEvolutionStageHTML(pokemonData, name) {      //char gives first letter and slice the rest - the first letter
    return `
        <div class="evolutionStage">
            <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${name}">
            <p>${name.charAt(0).toUpperCase() + name.slice(1)}</p>              
        </div>
    `;
}


function createEvolutionArrowHTML() {
    return `
                <div class="evolutionArrow">➤</div>
            `;
}


