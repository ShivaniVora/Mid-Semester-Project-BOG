//setting all variables and constants
const rightArrow = document.getElementById("arrowr");
const leftArrow = document.getElementById("arrowl");
const moves = document.getElementById("moves");
const info = document.getElementById("info");
const tag1 = document.getElementById("tag1");
const tag2 = document.getElementById("tag2");
const infoHeader = document.getElementById("i-or-m");
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
var text = "";
var i = 0;

//setting some initial values
tag1.style.display = "none";
tag2.style.display = "none";
id = 1;
info.style.backgroundColor = "#7CFF79";
iM = 1;
changePokemon(id, iM); //initial call to the changePokemon method

//adding event listeners to buttons (info, moves, right arrow and left arrow)
info.addEventListener("click", (e) => {
  info.style.backgroundColor = "#7CFF79";
  moves.style.backgroundColor = "#E8E8E8";
  infoHeader.textContent = "Info";
  iM = 1;
  changePokemon(id, iM);
});

moves.addEventListener("click", (e) => {
  info.style.backgroundColor = "#E8E8E8";
  moves.style.backgroundColor = "#7CFF79";
  infoHeader.textContent = "Moves";
  iM = 2;
  changePokemon(id, iM);
});

leftArrow.addEventListener("click", (e) => {
  if (id - 1 > 0) {
    id = id - 1;
    changePokemon(id, iM);
  }
});

rightArrow.addEventListener("click", (e) => {
  if (id < 905) {
    id = id + 1;
    changePokemon(id, iM);
  }
});

//creating functions to parse various part of the data set retrived after fetching
//creates the moves string
function createMovesString(data) {
  text = "";
  for (let i = 0; i < data.moves.length; i++) {
    text = text + data.moves[i].move.name + "\n";
  }
}

//creates string with all information
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

//changes the pokemon being displayed
function changePokemon(id, iM) {
  var temp = "https://pokeapi.co/api/v2/pokemon/NUM_HERE";
  var newUrl = temp.replace("NUM_HERE", id); //returns a url with the changed id number for a button click (or initial call = 1)

  fetch(newUrl) //calling the fetch function
    .then((resp) => resp.json()) //parsing data into json object
    .then((data) => allfunctions(data)); //calling method to call necessary functions

  //passing in data to a method call
  allfunctions = (data) => {
    showName(data.name);
    getImage(data.id);
    infoAndMoves(data);
    addTags(data);
  };

  //setting value of the text box holding the name to the value of the name of the new pokemon
  showName = (dn) => {
    const nameBox = document.getElementById("name");
    nameBox.textContent = dn;
  };

  //changing the src for the image based on the id number change in the url
  getImage = (id) => {
    var url =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/NUM_HERE.png";
    url = url.replace("NUM_HERE", id);
    const imageLink = document.getElementById("image");
    imageLink.src = url;
  };

  //calling the appropriate method depending on whether or not the info or moves button is clicked
  infoAndMoves = (data) => {
    const infoMovesBox = document.getElementById("info-moves-box");
    if (iM === 1) {
      createInfo(data);
      infoMovesBox.innerText = text;
    } else {
      createMovesString(data);
      infoMovesBox.innerText = text;
    }
  };

  //adding color-coded types depending on the values in the parsed data object
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
