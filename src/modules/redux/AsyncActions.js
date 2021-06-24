import axios from "axios";
import {setPokemon,gatheringPokemon, setCurrentRender, setNumberOfPages, setSelectedPokemon} from "../AppState";
import AsyncStorage from "@react-native-async-storage/async-storage";
const api = "https://pokeapi.co/api/v2/"
let pokemonCount = 1
let pokemonsToGather = 890
const pokemonKeystore = "@Pokemons"


export async function getPokemonsOnStart(dispatch){
    const{exists, asyncPokemons } = await getAsyncPokemons()
    if(exists && asyncPokemons.length-1 < pokemonsToGather){
        asyncPokemons.forEach(pokemon => {
                dispatch(setPokemon(pokemon))
        });
        return dispatch(paginate( 1 ))
    }
    while( pokemonCount < pokemonsToGather ){
         await axios.get(`${api}pokemon/${pokemonCount}`) .then((response)=>{
            let pokemon
            let img =response.data.sprites.front_default
            let name =response.data.name
            let key = pokemonCount.toString()
            pokemon = {img,name,key}
            dispatch(setPokemon(pokemon))
        }) .catch(e => console.log('error while gathering pokemons at start ',e ))    
        ++pokemonCount    
    }
    dispatch(saveAsyncPokemons())
    dispatch(paginate( 1 ))
}

export async function getSinglePokemon( id,dispatch ){
    await axios.get(`${api}pokemon/${id}`) .then(async (response)=>{
        let pokemon
        let species = await axios.get(`${api}pokemon-species/${id}`)
        .catch(e=>console.log('error while retrieving species',e))
        console.log('description',species.data.flavor_text_entries[0].flavor_text)
        let description = species.data.flavor_text_entries[0].flavor_text
        let stats = response.data.stats
        let img =response.data.sprites.front_default
        let name =response.data.name
        let key = pokemonCount.toString()
        pokemon = {img,name,key,description,stats}
        console.log('pokemon before being saved',pokemon)
        dispatch(setSelectedPokemon(pokemon))
    }) .catch(e => console.log('error while gathering pokemons at start ',e ))    

}



export function paginate( pageToGather ){
    return async ( dispatch, getState ) =>{
        const{ pokemons ,numberOfPagesState } = getState().app;
        let numberOfpages = Math.ceil((pokemons.length-1)/50);
        if(numberOfPagesState === 0){
            dispatch(setNumberOfPages(numberOfpages))
        }
            let rangeStart = 0;
            try{
                for(page=0; page<numberOfpages; ++page){
                    if((pageToGather -1 ) === page){
                        pokemonsPaged = pokemons.slice(rangeStart,rangeStart+50)
                        pageToSave = {page,pokemonsPaged}
                        dispatch(setCurrentRender(pageToSave))
                    }
                     rangeStart=rangeStart+50;
                }

            }catch(e){
                console.log('error while paginating', e)
            }
          
    }
}

export function savePokemon(){
    return async (disptach, getState) =>{
        try{
            const{ pokemonSelected } = getState().app;
            JSON.stringify(pokemonSelected);
            await AsyncStorage.setItem(`${pokemonKeystore}${pokemonSelected.key}`,)
        }catch(e){
            console.log('error while saving pokemon',e)
        }

    }
}




export  function saveAsyncPokemons(){
    return async ( dispatch, getState) => {
        try{
            const{ pokemons } = getState().app;
            let pokemonsToStore = JSON.stringify( pokemons );
             await AsyncStorage.setItem(pokemonKeystore,pokemonsToStore)

        }catch(e){
            console.log('error while saving pokemons',e) 

        }
    }
}

export async function getAsyncPokemons(){
    try{
        let stringifyPokemons = await AsyncStorage.getItem(pokemonKeystore)
        let asyncPokemons = JSON.parse(stringifyPokemons)
        let validate = asyncPokemons ? asyncPokemons[0].name? true:false:false
        if(validate){
            return { exists:true, asyncPokemons}
        }
        return{exists:false , asyncPokemons:[]}
    }catch(e){
        console.log('error while retrieving pokemons from storage',e)
    }

}

export  function filterPokemons(){
    return async(dispatch,getState) => {
        const{ pokemons,search } = getState().app;
       let iSnumber = /^-?[\d.]+(?:e-?\d+)?$/.test(search);
            console.log('is this a number',iSnumber)
       if(iSnumber){
        console.log('weeeeeeep')
         filteredPokemons = pokemons.filter((item)=>{
            return item.key===search 
            })  
       }else{ 
        filteredPokemons = pokemons.filter((item)=>{
            return item.name.includes(search.toLowerCase())  
            })
       }

        let searchRender = {page:0, pokemonsPaged:filteredPokemons}
        dispatch(setCurrentRender(searchRender))
        
    }
}



