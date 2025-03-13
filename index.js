const URL = "https://pokeapi.co/api/v2/pokemon/?limit=12";
const next = document.getElementById("next");
const pkmn = document.getElementById("pkmn");

/* async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
} */
/* 
async function printData(url) { 
  const data = await getData(url);
  console.log(data);
  const array = data.results;
  for (const element of array) {
    pkmn.innerHTML += "<div id='pokemon'>" + element.name + "</div>";
    await printPkmn(element.url);
  }
} */

function getPokemonImage(pokemonID) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonID}.gif`;
}

const dynamicGallery = document.getElementById("dynamicGallery");

function clearDynamicGallery() {
  dynamicGallery.innerHTML = "";
}

function displayPokemon(pokemonData) {
  const pokemon = document.createElement("div");
  pokemon.id = pokemonData.name;
  pokemon.classList.add("pokemon");
  pokemon.innerHTML = `
    <img src="${getPokemonImage(pokemonData.id)}"></img>
    <h2>${pokemonData.name}</h2>
  `;

  pokemon.addEventListener("click", () => {
    console.log("click");
  });

  dynamicGallery.appendChild(pokemon);
}

/* function buttonR() {
  pkmn.innerHTML = "";
  offset += 20;
  const urlnext = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
  printData(urlnext);
}
function buttonL() {
  pkmn.innerHTML = "";
  offset -= 20;
  const urlnext = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
  printData(urlnext);
}
 */
let nextUrl;
let previousUrl;

const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");

nextButton.addEventListener("click", () => {
  load(nextUrl);
});

previousButton.addEventListener("click", () => {
  load(previousUrl);
});
//printData(urlnext);
/* 
async function printPkmn(url) {
  const dataPokemon = await getData(url);
  console.log(dataPokemon);
  pkmn.innerHTML +=
    "<img src=" +
    dataPokemon.sprites.versions["generation-v"]["black-white"].animated
      .front_default +
    "></img>";
}
 */

async function load(url = URL) {
  if (!url) return;
  clearDynamicGallery();

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  data.results.forEach((pokemonData) => {
    const pokemonID = pokemonData.url.split("/")[6];
    displayPokemon({ ...pokemonData, id: pokemonID });
  });

  nextUrl = data.next;
  previousUrl = data.previous;
}

load();
