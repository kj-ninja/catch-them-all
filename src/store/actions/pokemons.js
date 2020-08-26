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

const getGenderByRate = (rate) => {
    if (rate === -1) {
        return 'genderless';
    }
    if (rate === 0) {
        return '100% samiec';
    }
    if (rate === 8) {
        return '100% samica';
    }
    const femaleChance = (100 / (rate * 8)).toFixed(1);
    const maleChance = (100 - femaleChance).toFixed(1);

    return `${femaleChance}% samica, ${maleChance}% samiec`;
};

const getCatchingDifficultyByRate = (rate) => {
    if (rate < 45) {
        return 'Wysoka';
    }

    if (rate > 150) {
        return 'Niska';
    } else {
        return 'Średnia';
    }
};

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

            const genderRate = pokemonSpecies.gender_rate;
            const pokemonGender = getGenderByRate(genderRate);

            const encounter = pokemonSpecies.habitat ? pokemonSpecies.habitat.name : 'brak';
            const catchingDifficulty = getCatchingDifficultyByRate(pokemonSpecies.capture_rate);

            console.log(pokemon.stats);

            const pokemonToShow = {
                id: pokemon.id,
                name: pokemon.name,
                imageUrl: pokemonImg,
                types: pokemon.types.map(({type})=> type.name),
                japanName: pokemonInJapan,
                pokemonTypes,
                pokedexNumber,
                region: pokemonRegion,
                gender: pokemonGender,
                encounter: encounter,
                catchingDifficulty,
                stats: pokemon.stats
            };

            dispatch(setPokemonToShow(pokemonToShow));
        } catch (error) {
            dispatch(fetchPokemonsFail(error));
        }
    };
};
