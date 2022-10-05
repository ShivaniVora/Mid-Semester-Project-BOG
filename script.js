id = 1;
const rightArrow = document.getElementById("arrowr");
const leftArrow = document.getElementById("arrowl");
const moves = document.getElementById("m");
const info = document.getElementById("i");
const tag1 = document.getElementById("tag1");
const tag2 = document.getElementById("tag2");
tag1.style.display = "none";
tag2.style.display = "none";

info.style.backgroundColor = "lightgreen";
iM = 1;
changeImage(id, iM);

var colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

info.addEventListener("click", (e) => {
  info.style.backgroundColor = "lightgreen";
  moves.style.backgroundColor = "snow";
  iM = 1;
  changeImage(id, iM);
});

moves.addEventListener("click", (e) => {
  info.style.backgroundColor = "snow";
  moves.style.backgroundColor = "lightgreen";
  iM = 2;
  changeImage(id, iM);
});

leftArrow.addEventListener("click", (e) => {
  if (id - 1 > 0) {
    id = id - 1;
    changeImage(id, iM);
  }
});

rightArrow.addEventListener("click", (e) => {
  id = id + 1;
  changeImage(id, iM);
});

var text = "";
var i = 0;

function createString(data) {
  text = "";
  for (let i = 0; i < data.moves.length; i++) {
    text = text + data.moves[i].move.name + "\n";
  }
}

function createInfo(data) {
  text = "height: " + data.height / 10 + "m\n";
  text = text + "weight: " + data.weight / 10 + "kg\n";
  text = text + "hp: " + data.stats[0].base_stat + "\n";
  text = text + "attack: " + data.stats[1].base_stat + "\n";
  text = text + "defense: " + data.stats[2].base_stat + "\n";
  text = text + "special-attack: " + data.stats[3].base_stat + "\n";
  text = text + "special-defense: " + data.stats[4].base_stat + "\n";
  text = text + "speed: " + data.stats[5].base_stat + "\n";
}

function changeImage(id, iM) {
  var temp = "https://pokeapi.co/api/v2/pokemon/NUM_HERE";
  var newUrl = temp.replace("NUM_HERE", id);

  fetch(newUrl)
    .then((resp) => resp.json())
    .then((data) => allfunctions(data));

  allfunctions = (data) => {
    showName(data.name);
    getImage(data.id);
    infoAndMoves(data);
    addTags(data);
  };

  showName = (dn) => {
    const nameBox = document.getElementById("name");
    nameBox.textContent = dn;
  };

  getImage = (id) => {
    var url =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/NUM_HERE.png";
    url = url.replace("NUM_HERE", id);
    const imageLink = document.getElementById("image");
    imageLink.src = url;
  };

  infoAndMoves = (data) => {
    const infoMovesBox = document.getElementById("info-moves-box");
    if (iM === 1) {
      createInfo(data);
      infoMovesBox.innerText = text;
    } else {
      createString(data);
      infoMovesBox.innerText = text;
    }
  };

  addTags = (data) => {
    tag1.style.display = "block";
    tag1.innerText = data.types[0].type.name;
    tag1.style.backgroundColor = colors[data.types[0].type.name];
    if (data.types.length > 1) {
      tag2.style.display = "block";
      tag2.innerText = data.types[1].type.name;
      tag2.style.backgroundColor = colors[data.types[1].type.name];
    } else {
      tag2.style.display = "none";
    }
  };
}
