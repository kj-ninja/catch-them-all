import * as actionTypes from '../actions/actionTypes';

const initialState = {
    transformedPokemons: [],
    loading: false,
    error: null,
    pokemonToShow: null,
}

const pokemons = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POKEMONS_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.FETCH_POKEMONS_SUCCESS:
        case actionTypes.SORT_POKEMONS:
            return {
                ...state,
                transformedPokemons: action.payload,
                loading: false
            }
        case actionTypes.FETCH_POKEMONS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.SET_POKEMON_TO_SHOW:
            return {
                ...state,
                pokemonToShow: action.payload,
                loading: false
            }
        default:
            return state;
    }
};

export default pokemons;