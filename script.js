id = 1
const rightArrow = document.getElementById("arrowr");

rightArrow.addEventListener("click", (e) => {
    id = id+1
})


var temp = "https://pokeapi.co/api/v2/pokemon/NUM_HERE";
var newUrl = temp.replace("NUM_HERE", id)

fetch(newUrl)
    .then((resp) => resp.json())
    .then((data) => allfunctions(data))

allfunctions = (data => {
    showName(data.name);
    getImage(data.id);
})


showName = (dn => {
    const nameBox = document.getElementById('name');
    nameBox.textContent = dn;
})


getImage = (im => {
    var ul = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/NUM_HERE.png"
    var url = ul.replace("NUM_HERE", im);
    const imageLink = document.getElementById('image');
    imageLink.src = url;
})