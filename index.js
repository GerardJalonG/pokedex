let offset = 0;

const url = "https://pokeapi.co/api/v2/pokemon/";
const urlnext = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
const next = document.getElementById("next");
const pkmn = document.getElementById("pkmn");

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
const text = getData(url);
console.log(text);

async function printData(url) {
  const data = await getData(url);
  console.log(data);
  const array = data.results;
  for (const element of array) {
    pkmn.innerHTML += "<div id='pokemon'>" + element.name + "</div>";
    await printPkmn(element.url);
  }
}

function buttonR() {
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

printData(urlnext);

async function printPkmn(url) {
  const dataPokemon = await getData(url);
  console.log(dataPokemon);
  pkmn.innerHTML +=
    "<img src=" +
    dataPokemon.sprites.versions["generation-v"]["black-white"].animated
      .front_default +
    "></img>";
}
