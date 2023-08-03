
;

// function getpokeinfo(pokename){
//     axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
//     .then(response => {
//         pokeList = response.data.results;
//         // console.log(pokeList);

//         pokeList.forEach(x => {
//             pokeIndex[x.name] = x;
//         }); //Index the array with the name 

//         // console.log(pokeIndex);

//         let pokemon = pokeIndex[`${pokename}`];
//         console.log(pokemon.url)
//     });
const pokeIndex = []
const dataList = document.getElementById('pokemon-list');

async function getpokeinfo(pokename){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);

        pokeList = response.data.results;
        // console.log("pokeList",pokeList);

        pokeList.forEach(x => {
        pokeIndex[x.name] = x;
        }); //Index the array with the name 

        console.log("pokeIndex",pokeIndex);

        let pokemon = pokeIndex[`${pokename}`];
        console.log("pokemon",pokemon.url)

        return pokeIndex;

    } catch (error) {
        console.error(error);
        alert("Pokemon is not in Data-List")
    }
    
    }


async function Send(){
    const EnterPoke = document.getElementById("name").value.toLowerCase();
    console.log(EnterPoke);
    await getpokeinfo(EnterPoke);
    // console.log("pokeIndex",pokeIndex);
    const pokemonNames = Object.keys(pokeIndex);
    // console.log("pokemonNames",pokemonNames);

    pokemonNames.forEach(x => {
        const option = document.createElement("option");
        option.value = x;
        dataList.appendChild(option);
    })
}


async function getData(pokename){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokename}/`);
        
        let myArray = [];
        
        for(let i = 0; i< response.data.stats.length; i++){
            let myObject = {[response.data.stats[i].stat.name] : response.data.stats[i].base_stat}
            myArray.push(myObject); 
        }
        console.log(myArray)

        console.log(response.data.forms[0].url)

    } catch (error) {
        console.error(error);
        alert("Pokemon is not in Data-List")
    }
}

pokename = 25
getData(pokename)


async function getImg(pokename){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/version-group/${pokename}/`);
        
        console.log("IMG: ",response.data)

    } catch (error) {
        console.error(error);
        alert("Pokemon is not in Data-List")
    }
}

getImg(pokename);

// abomasnow
    




// axios.get(`https://pokeapi.co/api/v2/`)
// .then(response => {
//     console.log(response)
// })

// const animales = ['Elephant', 'Lion', 'Giraffe', 'Tiger', 'Zebra', 'Monkey', 'Bear', 'Kangaroo', 'Penguin', 'Koala'];
// const dataList = document.getElementById('animal-list');

// animales.forEach(animal => {
//     const option = document.createElement('option');
//     option.value = animal;
//     dataList.appendChild(option);
