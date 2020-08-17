import {fetchPokemonsFail, fetchPokemonsSuccess} from "../store/actions/pokemons";

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const transformPokemons = (pokemons, callback) => {
    const newPokemons = [];

    pokemons.forEach(pokemon => {
        P.resource(pokemon.species.url)
            .then(function (response) {

                P.resource(response.evolution_chain.url)
                    .then(function (response) {

                        if (response.chain.species.name === pokemon.name) {
                            newPokemons.push({
                                id: pokemon.id,
                                name: pokemon.species.name,
                                imageUrl: pokemon.sprites.front_default,
                                type: pokemon.types[0].type.name,
                                minLvl: response.chain.evolution_details.length === 0 ? 1 : response.chain.evolution_details[0].min_level,
                                evolution: response.chain.evolves_to.length === 0 ? 'brak' : response.chain.evolves_to[0].species.name
                            })
                        } else if (response.chain.evolves_to.length > 0 && response.chain.evolves_to[0].species.name === pokemon.name) {
                            newPokemons.push({
                                id: pokemon.id,
                                name: pokemon.species.name,
                                imageUrl: pokemon.sprites.front_default,
                                type: pokemon.types[0].type.name,
                                minLvl: response.chain.evolves_to[0].evolution_details[0].min_level ? response.chain.evolves_to[0].evolution_details[0].min_level : 'brak',
                                evolution: response.chain.evolves_to[0].evolves_to.length === 0 ? 'brak' : response.chain.evolves_to[0].evolves_to[0].species.name
                            })
                        } else if (response.chain.evolves_to.length > 0 &&
                            response.chain.evolves_to[0].evolves_to.length > 0 &&
                            response.chain.evolves_to[0].evolves_to[0].species.name === pokemon.name) {
                            newPokemons.push({
                                id: pokemon.id,
                                name: pokemon.species.name,
                                imageUrl: pokemon.sprites.front_default,
                                type: pokemon.types[0].type.name,
                                minLvl: response.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level ? response.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level : 'brak',
                                evolution: response.chain.evolves_to[0].evolves_to[0].evolves_to.length === 0 ? 'brak' : response.chain.evolves_to[0].evolves_to[0].species.name
                            })
                        } else if (response.chain.evolves_to.length === 0) {
                            newPokemons.push({
                                id: pokemon.id,
                                name: pokemon.species.name,
                                imageUrl: pokemon.sprites.front_default,
                                type: pokemon.types[0].type.name,
                                minLvl: 1,
                                evolution: 'brak'
                            })
                        } else {
                            newPokemons.push({
                                id: pokemon.id,
                                name: pokemon.species.name,
                                imageUrl: pokemon.sprites.front_default,
                                type: pokemon.types[0].type.name,
                                minLvl: 1,
                                evolution: 'brak'
                            })
                        }

                        if (newPokemons.length === pokemons.length) {
                            callback(fetchPokemonsSuccess(newPokemons.sort((a, b) => a.id - b.id)));
                        }
                    });
            })
            .catch(error => callback(fetchPokemonsFail(error)));
    });
};

export default transformPokemons;