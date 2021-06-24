

import Home from "../Home/HomeContainer"
import Pokedex from "../PokeDex/PokedexContainer";


const StackNavigationData = [
  {
    name: 'Home',
    component: Home,
    headerTitleStyle: {
        backgroundColor: "#ff0000",
        flex:1,
        height:400
      },
  },
  {
    name:"Pokedex",
    component:Pokedex,
    header:null

  }
 
]
export default StackNavigationData;
