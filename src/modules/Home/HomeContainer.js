import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import HomeScreen from './HomeView';

import {getPokemonsOnStart,paginate,filterPokemons } from "../redux/AsyncActions";

import { resetState,setSearchString } from "../AppState";

export default compose(
    connect(
        state => ({
            currentRender:state.app.currentRender,
            numberOfPages:state.app.numberOfPagesState,
            searchString:state.app.search
          }),
        dispatch => ({
                getPokemonsOnStart: () => getPokemonsOnStart(dispatch),
                resetState: () => dispatch(resetState()),
                paginate: (page) => dispatch(paginate(page)),
                setSearchString: (string)=>{dispatch(setSearchString(string))},
                filterPokemons: ()=>dispatch(filterPokemons())
              }),
    )
)
(
  HomeScreen,
);