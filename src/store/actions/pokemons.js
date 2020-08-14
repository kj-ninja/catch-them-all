import * as actionTypes from './actionTypes';
import transformPokemons from "../../functions/transformPokemons";

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

export const fetchPokemonsStart = () => ({type: actionTypes.FETCH_POKEMONS_START});
export const fetchPokemonsSuccess = (pokemons) => ({type: actionTypes.FETCH_POKEMONS_SUCCESS, payload: pokemons});
export const fetchPokemonsFail = (error) => ({type: actionTypes.FETCH_POKEMONS_FAIL, payload: error});

export const fetchPokemons = (paginate, setTotalPages) => {
    return async dispatch => {
        try {
            dispatch(fetchPokemonsStart());
            const pokemonsList = await P.getPokemonsList(paginate);

            setTotalPages(Math.ceil(pokemonsList.count / paginate.limit));
            const pokemonsUrl = pokemonsList.results.map(pokemon => pokemon.url);
            const pokemonsArr = await P.resource(pokemonsUrl);

            transformPokemons(pokemonsArr, dispatch);
        } catch (error) {
            dispatch(fetchPokemonsFail(error));
        }
    };
};

export const setPokemonToShow = (pokemon) => ({type: actionTypes.SET_POKEMON_TO_SHOW, payload: pokemon});

export const setPokemonToShowAsync = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchPokemonsStart());
            const getPokemonById = await P.resource(`api/v2/pokemon/${id}`);
            dispatch(setPokemonToShow(getPokemonById));

        } catch (error) {
            dispatch(fetchPokemonsFail(error));
        }
    }
}

export const getPokemonImageSuccess = (image) => ({
    type: actionTypes.GET_POKEMON_IMAGE_SUCCESS,
    payload: image
});

export const getPokemonImage = (name) => {
    return async dispatch => {
        dispatch(fetchPokemonsStart());
        const pokemonImage = await P.getPokemonByName(name) // with Promise
        dispatch(getPokemonImageSuccess(pokemonImage.sprites.other["official-artwork"].front_default));
    }
}
