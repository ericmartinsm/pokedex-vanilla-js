# 📘 Pokédex — Vanilla JavaScript

Projeto desenvolvido como **desafio técnico Front-end**, com o objetivo de criar uma Pokédex interativa utilizando **Vanilla JavaScript**, consumindo dados da **PokéAPI**.

---

## 🎯 Objetivo

Criar uma aplicação web que liste Pokémon, permita **busca**, **filtros** e **paginação**, sem recarregar a página, seguindo o layout proposto no Figma e utilizando **JavaScript puro**.

---

## 🚀 Funcionalidades

- ✅ Listagem de Pokémon consumindo a PokéAPI
- 🔍 Busca de Pokémon por nome
- 📄 Paginação com navegação entre páginas
- 🧩 Filtro por tipo de Pokémon (fire, water, grass, etc.)
- ⚡ Interações dinâmicas sem reload da página
- 📱 Layout responsivo (desktop e mobile)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **PokéAPI**  
  https://pokeapi.co/

> Nenhum framework ou biblioteca externa foi utilizada, conforme solicitado no desafio.

---

## 🧠 Decisões Técnicas

- A aplicação foi desenvolvida utilizando **ES Modules**, separando responsabilidades entre:
  - consumo de API
  - renderização
  - controle de estado (paginação, busca e filtro)
- A busca por nome utiliza o endpoint oficial da PokéAPI, que funciona por correspondência exata.
- Durante a busca ou aplicação de filtros, a paginação é desativada para evitar inconsistência de estados.
- O código foi organizado visando **legibilidade, manutenibilidade e clareza de raciocínio**.

---

## ▶️ Como rodar o projeto

### Pré-requisitos
- Navegador moderno (Chrome, Edge, Firefox)
- Servidor local (necessário para ES Modules)

### Opção 1 — VSCode + Live Server (recomendado)

1. Abra o projeto no VSCode  
2. Instale a extensão **Live Server**  
3. Clique com o botão direito em `index.html`  
4. Selecione **Open with Live Server**

Acesse:


---

### Opção 2 — Node.js

Se tiver Node instalado:

```bash
npm install -g serve
serve .

npx http-server

http://localhost:8080


pokedex/
 ├─ index.html
 ├─ styles/
 │    └─ style.css
 ├─ scripts/
 │    ├─ api.js
 │    ├─ render.js
 │    └─ main.js
 └─ README.md



