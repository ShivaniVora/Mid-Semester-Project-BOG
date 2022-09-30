fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then((resp) => resp.json())
    .then((data) => showName(data.name));

showName = (dn => {
    console.log('runs')
    const nameBox = document.getElementById('name');
    nameBox.textContent = dn;
})
