import printChart from "./functions.js";
import { setCard } from "./functions.js";


const pokeIndex = []
const datalist = document.getElementById('pokemon-list');
let pokeMList = [];
let pokeMasterList = [];


document.addEventListener("DOMContentLoaded", () => {
    const inputElement = document.getElementById("name");
    
    inputElement.addEventListener("mouseover", Lists);
    inputElement.addEventListener("input", pokeId);
});

//DROPDOWN LIST
async function Lists(){
    pokeMasterList = await getData();
    // console.log("pokeIndex",pokeIndex);
    const pokemonNames = Object.keys(pokeMasterList);
    // console.log("pokemonNames",pokemonNames);
    pokemonNames.forEach(x => {
        const option = document.createElement("option");
        option.value = x;
        datalist.appendChild(option);
    })
}

//TAKE ID FROM PLACEHOLDER AND CALL CHART AND IMG
async function pokeId(){
    const enterPoke = document.getElementById("name").value.toLowerCase().trim();
    // console.log("enterPoke", enterPoke);
    pokeMasterList = await getData();
    let pokemon = pokeMasterList[enterPoke];
    let pokemonId = pokemon.id;
    let pokemonImg1 = pokemon.img1;
    // console.log(pokemonImg1)
    // console.log("PokemonId:",pokemonId)
    let statsResult = await stats(pokemonId);
    let keysArray = statsResult.keysArray;
    let valuesArray = statsResult.valuesArray;

    // valuesArray = [344,14,13,1,24,1]

    printChart(keysArray, valuesArray);
    setCard(pokemonImg1, enterPoke);
    
}

//GET POKEAPI DATA
async function getData(){
    let pokeMasterList = [];
    
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);

        let numberOfPoke = response.data.count;
        // console.log("Number of Poke:", numberOfPoke);
        const results = response.data.results;
        // console.log("Results:", results);


        results.map(poke => {
            // console.log(poke)
            let urlParts = poke.url.split('/');
            // Get the penultimate element
            let idStr = urlParts[urlParts.length - 2];
            // Convert the string to an integer
            let id = parseInt(idStr);
            // console.log("ID:", id);

            poke.id = id;
            poke.img1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            poke.img2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            // console.log(poke)
            pokeMList.push(poke)
        })

        pokeMList.map(poke => {
            pokeMasterList[poke.name] = poke
        })

        // console.log("Pokemon Master List:", pokeMList)
        // console.log("pokeMasterList", pokeMasterList)
        

        return pokeMasterList;

    } catch (error) {
        console.error(error);
        alert("don´t get")
    }
}

//GET STATS
async function stats(id){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        let pokeStats = [];
        
        for(let i = 0; i< response.data.stats.length; i++){
            let myObject = {[response.data.stats[i].stat.name] : response.data.stats[i].base_stat}
            pokeStats.push(myObject); 
        }
         console.log("pokeStats",pokeStats)

        const keysArray = [];
        const valuesArray = [];

        for (const x of pokeStats) {
        const key = Object.keys(x)[0];
        const value = x[key];

        keysArray.push(key);
        valuesArray.push(value);
        }
        console.log('Array de claves:', keysArray);
        console.log('Array de valores:', valuesArray);

        return {
            keysArray: keysArray,
            valuesArray: valuesArray
        };

    } catch (error) {
        console.error(error);
        alert("Error geting Stats")
    }
}

//CREATE TABLE
async function table(){
    await getData();
    let tableBody = document.getElementById("tbody");

    // console.log(pokeMList[0].id)

    pokeMList.forEach(x => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerHTML = x.id;
        row.insertCell(1).innerHTML = x.name;
        row.insertCell(2).innerHTML = `<img src="${x.img2}" alt="${x.name}" class="poke-img">`;
    })

}

table()
