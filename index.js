const pokeIndex = []
const datalist = document.getElementById('pokemon-list');

async function getpokeinfo(){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);

        // console.log("data",response.data)

        pokeList = response.data.results;
        // console.log("pokeList",pokeList);

        pokeList.forEach(x => {
        pokeIndex[x.name] = x;
        }); //Index the array with the name 

        // console.log("pokeIndex",pokeIndex);
        return pokeIndex;

    } catch (error) {
        console.error(error);
        alert("It was not possible to access data-base")
    }
    
    };


async function List(){
    await getpokeinfo();
    // console.log("pokeIndex",pokeIndex);
    const pokemonNames = Object.keys(pokeIndex);
    // console.log("pokemonNames",pokemonNames);

    pokemonNames.forEach(x => {
        const option = document.createElement("option");
        option.value = x;
        datalist.appendChild(option);
    })
}

function pokeId(){
    const EnterPoke = document.getElementById("name").value.toLowerCase();

    PokeUrl = pokeIndex[EnterPoke].url;
    console.log("PokeUrl", EnterPoke, PokeUrl);
    
}

async function stats(pokeid){
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeid}/`);
        

        let pokeStats = [];
        
        for(let i = 0; i< response.data.stats.length; i++){
            let myObject = {[response.data.stats[i].stat.name] : response.data.stats[i].base_stat}
            pokeStats.push(myObject); 
        }
        // console.log("pokeStats",pokeStats)
        // console.log(response.data.forms[0].url)
        // console.log(response.data.name)

        return pokeStats;
    } catch (error) {
        console.error(error);
        alert("Pokemon is not in Data-List")
    }
}

// pokeid = 25
// stats(pokeid)



async function gett(){
    let pokeMasterList = [];
    let pokeMList = [];
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
        // console.log("viewccc", pokeMasterList)
        console.log("viewccc", pokeMasterList)

        return pokeMasterList;

    } catch (error) {
        console.error(error);
        alert("don´t get")
    }
}

let pokeMasterList = gett()

async function lastList(){

    try {
        let pokeMasterList = await gett();
        console.log("Last List", pokeMasterList);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
        console.log("Last List", response.data.results[2]);

    } catch (error) {
        console.error(error);
        alert("Last List error")
    }
}

lastList()




// let poke = { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/2333333/' };

// // Divide the URL in parts using '/'
// let urlParts = poke.url.split('/');

// // Get the penultimate element
// let idStr = urlParts[urlParts.length - 2];

// // Convert the string to an integer
// let id = parseInt(idStr);

// console.log("ID:", id);

// poke.id = id;

// // console.log("ID:", id);
// // console.log("Modified Pokemon:", poke);

