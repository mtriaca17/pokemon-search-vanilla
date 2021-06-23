const container = document.querySelector('.container');
const randomBtn = document.querySelector('#randomBtn');
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');

//event listeners

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchQuery = searchInput.value.toLowerCase();
  fetchPokemon(searchQuery);
});

randomBtn.addEventListener('click', e => {
  fetchPokemon(randNum());
});

//data functions
const fetchPokemon = async id => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const data = await res.json();
  return getPokeData(data);
};

function getPokeData(data) {
  //id, name, type
  const pokeInfo = {
    id: data.id,
    name: data.name,
    type: getTypes(data.types),
    sprites: getSprites(data.sprites),
  };
  addDataToPage(pokeInfo);
  // return pokeInfo
}

//dom functions

function addDataToPage(data) {
  // console.log(data)
  container.innerHTML = '';
  searchInput.value = data.id;
  container.append(createCard(data.name, data.id, data.sprites, data.type));
}

function createCard(name, id, sprites, type) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  cardContainer.append(createNameDiv(name, id));
  cardContainer.append(createSpritesDiv(sprites));
  cardContainer.append(createTypeDiv(type));

  return cardContainer;
}

function createNameDiv(name, id) {
  const nameDiv = document.createElement('div');
  nameDiv.classList.add('name-container');

  nameDiv.innerHTML = `
  <h3 class="poke-id">${id}</h3> <span class="name-dash">-</span> <h3 class="poke-name">${capitalizeFirstLetter(
    name
  )}</h3>
  `;

  return nameDiv;
}

function createSpritesDiv(sprites) {
  const cardImages = document.createElement('div');
  cardImages.classList.add('image-container');

  sprites.forEach(item => {
    img = document.createElement('img');
    img.classList.add('sprite');
    img.src = item;
    cardImages.append(img);
  });

  return cardImages;
}

function createTypeDiv(type) {
  const typeContainer = document.createElement('div');
  typeContainer.classList.add('type-container');

  type.forEach(item => {
    type = document.createElement('p');
    type.classList.add(item);
    type.innerText = capitalizeFirstLetter(item);
    typeContainer.append(type);
  });

  return typeContainer;
}

//helper functions

function getSprites(obj) {
  spriteUrlArr = [];

  spriteUrlArr.push(obj.front_default);
  spriteUrlArr.push(obj.front_shiny);

  return spriteUrlArr;
}

function getTypes(arr) {
  outputTypes = [];

  arr.forEach(item => {
    outputTypes.push(item.type.name);
  });

  return outputTypes;
}

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function randNum() {
  return Math.floor(Math.random() * (893 - 1 + 1) + 1);
}
