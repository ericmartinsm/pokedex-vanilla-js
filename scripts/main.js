import {
  getPokemons,
  getPokemonByUrl,
  getPokemonByNameOrId,
  getPokemonsByType
} from "./api.js";

import { renderPokemonList } from "./render.js";

const LIMIT = 18;
let currentPage = 1;
let totalPokemons = 0;

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const paginationPages = document.querySelector(".pagination-pages");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const searchButton = document.getElementById("searchButton");
const filterButton = document.getElementById("filterButton");
const filterDropdown = document.getElementById("filterDropdown");
const filterOptions = document.querySelectorAll(".filter-option");

async function loadPokemons() {
  const offset = (currentPage - 1) * LIMIT;

  const data = await getPokemons(LIMIT, offset);
  totalPokemons = data.count;

  const detailedPokemons = await Promise.all(
    data.results.map(pokemon => getPokemonByUrl(pokemon.url))
  );

  renderPokemonList(detailedPokemons);
  updatePagination();
}

function updatePagination() {
  const totalPages = Math.ceil(totalPokemons / LIMIT);

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  
  paginationPages.innerHTML = '';
  
  const maxPagesToShow = 4;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  // Ajusta ranger para manter 4 páginas visíveis próximo ao fim
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageSpan = document.createElement('span');
    pageSpan.className = 'page';
    pageSpan.textContent = i;
    
    if (i === currentPage) {
      pageSpan.classList.add('active');
    }
    
    pageSpan.addEventListener('click', () => {
      if (i !== currentPage) {
        currentPage = i;
        loadPokemons();
      }
    });
    
    paginationPages.appendChild(pageSpan);
  }
}

async function handleSearch() {
  const value = searchInput.value.trim().toLowerCase();

  if (!value) {
    currentPage = 1;
    loadPokemons();
    return;
  }

  try {
    const pokemon = await getPokemonByNameOrId(value);
    renderPokemonList([pokemon]);

    prevBtn.disabled = true;
    nextBtn.disabled = true;
  } catch {
    renderPokemonList([]);
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }
}

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

filterButton.addEventListener("click", (e) => {
  e.stopPropagation();
  filterDropdown.classList.toggle("active");
});

filterOptions.forEach(option => {
  option.addEventListener("click", () => {
    const type = option.dataset.type;
    
    filterOptions.forEach(opt => opt.classList.remove("selected"));
    option.classList.add("selected");
    
    // Sincroniza com select oculto para manter lógica de filtro existnte
    typeFilter.value = type;
    typeFilter.dispatchEvent(new Event("change"));
    
    filterDropdown.classList.remove("active");
  });
});

document.addEventListener("click", (e) => {
  if (!filterButton.contains(e.target) && !filterDropdown.contains(e.target)) {
    filterDropdown.classList.remove("active");
  }
});

typeFilter.addEventListener("change", async (e) => {
  const type = e.target.value;

  if (!type) {
    currentPage = 1;
    loadPokemons();
    return;
  }

  try {
    const data = await getPokemonsByType(type);

    // API retorna todos pokemons do tipo - limitando para performance
    const limited = data.pokemon.slice(0, 20);

    const detailedPokemons = await Promise.all(
      limited.map(p => getPokemonByUrl(p.pokemon.url))
    );

    renderPokemonList(detailedPokemons);

    prevBtn.disabled = true;
    nextBtn.disabled = true;
  } catch (error) {
    console.error(error);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadPokemons();
  }
});

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();

  if (value === "") {
    currentPage = 1;
    loadPokemons();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(totalPokemons / LIMIT);
  if (currentPage < totalPages) {
    currentPage++;
    loadPokemons();
  }
});

loadPokemons();
