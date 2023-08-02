
const pokeIndex = [];

function getpokeinfo(pokename){
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
    .then(response => {
        pokeList = response.data.results;
        // console.log(pokeList);

        pokeList.forEach(x => {
            pokeIndex[x.name] = x;
        }); //Index the array with the name 

        // console.log(pokeIndex);

        let pokemon = pokeIndex[`${pokename}`];
        console.log(pokemon.url)
    });
}

function Send(){
    const poke = document.getElementById("name").value.toLowerCase();
    console.log(poke);
    getpokeinfo(poke);
}


// abomasnow
    




// axios.get(`https://pokeapi.co/api/v2/`)
// .then(response => {
//     console.log(response)
// })