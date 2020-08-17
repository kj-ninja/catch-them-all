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

export const getPokemonById = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchPokemonsStart());
            const pokemon = await P.resource(`api/v2/pokemon/${id}`);
            const pokemonImg = pokemon.sprites.other["official-artwork"].front_default;
            const pokemonTypes = pokemon.types.map(({type})=> type.name);

            const pokemonSpecies = await P.getPokemonSpeciesByName(pokemon.name);
            const pokemonInJapan = `(jap. ${pokemonSpecies.names[0].name} ${pokemonSpecies.names[1].name})`
            const pokedexNumber = pokemonSpecies.pokedex_numbers[0].entry_number;

            const pokemonGeneration = await P.getGenerationByName(pokemonSpecies.generation.name);
            const pokemonRegion = pokemonGeneration.main_region.name

            const pokemonToShow = {
                id: pokemon.id,
                name: pokemon.name,
                imageUrl: pokemonImg,
                types: pokemon.types.map(({type})=> type.name),
                japanName: pokemonInJapan,
                pokemonTypes,
                pokedexNumber,
                region: pokemonRegion
            };

            dispatch(setPokemonToShow(pokemonToShow));
        } catch (error) {
            dispatch(fetchPokemonsFail(error));
        }
    };
};

// export const getPokemonImageSuccess = (image) => ({
//     type: actionTypes.GET_POKEMON_IMAGE_SUCCESS,
//     payload: image
// });
//
// export const getPokemonImage = (name) => {
//     return async dispatch => {
//         dispatch(fetchPokemonsStart());
//         const pokemonImage = await P.getPokemonByName(name) // with Promise
//         dispatch(getPokemonImageSuccess(pokemonImage.sprites.other["official-artwork"].front_default));
//     }
// }
