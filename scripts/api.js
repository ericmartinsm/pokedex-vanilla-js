const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

/**
 * Busca uma página de pokémons na API
 * @param {number} limit - quantidade de pokémons por página
 * @param {number} offset - deslocamento (página atual * limit)
 * @returns {Promise<any>}
 */
export async function getPokemons(limit = 20, offset = 0) {
  const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar lista de pokémons");
  }

  const data = await response.json();
  return data; // { count, next, previous, results }
}

/**
 * Busca os dados detalhados de um pokémon (por URL completa)
 * @param {string} url - URL que vem em results[].url
 * @returns {Promise<any>}
 */
export async function getPokemonByUrl(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do pokémon");
  }

  return response.json();
}

/**
 * Busca um pokémon pelo nome ou id
 * @param {string|number} identifier - nome (pikachu) ou id (25)
 * @returns {Promise<any>}
 */
export async function getPokemonByNameOrId(identifier) {
  const response = await fetch(`${BASE_URL}/${identifier}`);

  if (!response.ok) {
    throw new Error("Pokémon não encontrado");
  }

  return response.json();
}


export async function getPokemonsByType(type) {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar pokémons por tipo");
  }

  return response.json();
}
