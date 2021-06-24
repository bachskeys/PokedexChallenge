


type Pokemon = {
  name: string,
  image: string
};
type PokemonSelected = {
  name:string,
  img:string,
  stats:Array<object>,
  description:string

}
type Page = {
  page: number,
  pokemonsPaged: Array<Pokemon>,
}
type AppStateType = {
    pokemons: Array<Pokemon>,
    gatheringPokemons: boolean,
    currentRender: Page,
    numberOfPagesState: number,
    search:string,
    pokemonSelected:PokemonSelected
  };
  
  type ActionType = {
    type: string,
    payload?: any,
  };
  
  export const initialState: AppStateType = {
    pokemons:[],
    gatheringPokemons:false,
    currentRender:{page:0,pokemonsPaged:[]},
    numberOfPagesState:0,
    search:"",
    pokemonSelected:{name:"",img:"",stats:[{}],description:""}}  
  export const SET_POKEMON = 'AppState/SET_POKEMON';
  export const SET_GATHERING_POKEMONS = 'AppState/SET_GATHERING_POKEMONS';
  export const SET_ASYNC_POKEMONS = 'AppState/SET_ASYNC_POKEMONS';
  export const RESET_STATE = "AppState/RESET_STATE";
  export const SET_CURRENT_RENDER = "AppState/SET_CURRENT_RENDER";
  export const SET_NUMBER_OF_PAGES = "AppState/SET_NUMBER_OF_PAGES";
  export const SET_SEARCH_STRING = 'AppState/SET_SEARCH_STRING';
  export const SET_SELECTED_POKEMON = "AppState/SET_SELECTED_POKEMON";



  export function resetState(){
    return{
      type:RESET_STATE
    }
  }
  export function setSelectedPokemon(payload: Pokemon){
    return{
      type:SET_SELECTED_POKEMON,
      payload
    }
  }

  export function setSearchString(payload:string){
    return{
      type:SET_SEARCH_STRING,
      payload
    }
  }
  export function setNumberOfPages(payload: number){
    return{
      type:SET_NUMBER_OF_PAGES,
      payload
    }
  }

  export function setCurrentRender(payload: Page){
    return{
      type:SET_CURRENT_RENDER,
      payload
    }
  }

  export function setAsyncPokemons(payload: Array<Pokemon>){
    return{
      type:SET_ASYNC_POKEMONS,
      payload
    }
  }

  
  export function setGatheringPokemons(payload: boolean){
    return{
      type: SET_GATHERING_POKEMONS,
      payload
    }
  }
  
  export function setPokemon(payload: Pokemon ): ActionType {
    return {
      type: SET_POKEMON,
      payload
    };
  }
  
  export default function AppStateReducer(
    state: AppStateType = initialState,
    action: ActionType,
  ): AppStateType {
    switch (action.type) {
      case RESET_STATE:
        return initialState;
      case SET_POKEMON:
        return {
          ...state,
          pokemons:[...state.pokemons,action.payload],
        };
      case SET_ASYNC_POKEMONS:
        return{
          ...state,
          pokemons:[...action.payload]
        }
      case SET_CURRENT_RENDER:
        return{
          ...state,currentRender:action.payload
        }
      case SET_NUMBER_OF_PAGES:
        return{
          ...state,
          numberOfPagesState:action.payload
        }
      case SET_SEARCH_STRING:
        return{
          ...state,
           search:action.payload
        }
      case SET_SELECTED_POKEMON:
        return{
          ...state,
          pokemonSelected:action.payload
        }
      case SET_GATHERING_POKEMONS:
        return{
          ...state,
          gatheringPokemons:action.payload
        }
      default:
        return state;
    }
  }
  