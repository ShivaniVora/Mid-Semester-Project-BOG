id = 1;
const rightArrow = document.getElementById("arrowr");
const leftArrow = document.getElementById("arrowl");
const moves = document.getElementById("m");
const info = document.getElementById("i");
iM = 1;
changeImage(id, iM);


info.addEventListener("click", (e) => {
    iM = 1;
    changeImage(id, iM);
})

moves.addEventListener("click", (e) => {
    iM = 2;
    changeImage(id, iM);
})

leftArrow.addEventListener("click", (e) => {
    if(id-1 >0) {
        id = id-1;
        changeImage(id, iM);
    }
})

rightArrow.addEventListener("click", (e) => {
  id = id + 1;
  changeImage(id)
});

var text = ""
var moveCount = 0
function getMoves(data) {
    data.forEach(createString)
    moveCount++;
}

function createString(movement) {
    text = text + movement.moveCount.move.name + "\n";
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
  };

  showName = (dn) => {
    const nameBox = document.getElementById("name");
    nameBox.textContent = dn;
  };

  getImage = (im) => {
    var ul =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/NUM_HERE.png";
    var url = ul.replace("NUM_HERE", im);
    const imageLink = document.getElementById("image");
    imageLink.src = url;
  };

  infoAndMoves = (data) => {
    const infoMovesBox = document.getElementById("info-moves-box")
    if(iM === 1) {
        infoMovesBox.textContent = data.name
    }
    else {
        // getMoves(data.moves);
        infoMovesBox.textContent = "moves here";
    }
    
  };
}