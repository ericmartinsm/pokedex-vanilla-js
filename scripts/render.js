export function renderPokemonList(pokemons) {
  const list = document.getElementById("pokemonList");
  list.innerHTML = "";

  if (!pokemons.length) {
    list.innerHTML = "<p>Nenhum Pokémon encontrado</p>";
    return;
  }

  pokemons.forEach(pokemon => {
    const mainType = pokemon.types[0].type.name;
    // Progressive loading: thumbnail (~5KB) → HD (~50KB) para melhor UX
    const thumbnailUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    const highQualityUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    const card = document.createElement("div");
    card.className = `pokemon-card type-${mainType}`;
    card.innerHTML = `
      <div class="pokemon-card-header">
        <span class="pokemon-type type-${mainType}">${translateType(mainType)}</span>
        <span class="pokemon-id">#${pokemon.id}</span>
      </div>

      <div class="pokemon-image-wrapper">
        <img 
          src="${thumbnailUrl}" 
          data-hq="${highQualityUrl}"
          alt="${pokemon.name}"
          class="pokemon-image loading"
        />
        <div class="image-loader"></div>
      </div>

      <h3 class="pokemon-name">
        ${capitalize(pokemon.name)}
      </h3>
    `;

    list.appendChild(card);
    
    const img = card.querySelector('.pokemon-image');
    const loader = card.querySelector('.image-loader');
    const highQualityImage = new Image();
    highQualityImage.src = highQualityUrl;
    highQualityImage.onload = () => {
      img.src = highQualityUrl;
      img.classList.remove('loading');
      loader.style.display = 'none';
    };
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function translateType(type) {
  const types = {
    grass: "Planta",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    bug: "Inseto",
    normal: "Normal",
    poison: "Veneno",
    ground: "Terra",
    fairy: "Fada"
  };

  return types[type] || type;
}
