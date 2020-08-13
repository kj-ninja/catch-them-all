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

export const setPokemonToShow = (pokemon) => ({type: actionTypes.POKEMON_TO_SHOW, payload: pokemon});
