import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import PokedexScreen from './PokedexView';
import { getSinglePokemon } from "../redux/AsyncActions"



export default compose(
    connect(
        state => ({
            pokemonSelected:state.app.pokemonSelected
          }),
        dispatch => ({
                getSinglePokemon: (id) => getSinglePokemon(id,dispatch)
              }),
    )
)
(
  PokedexScreen,
);