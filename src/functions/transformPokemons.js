const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const transformPokemons = (pokemons, callback) => {
    console.log(pokemons);
    const newPokemons = [];

    pokemons.forEach(pokemon => {
        P.getPokemonSpeciesByName(pokemon.name)
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
                                evolution: response.chain.evolves_to[0].species.name,
                            })
                        } else if (response.chain.evolves_to[0].species.name === pokemon.name) {
                            newPokemons.push({
                                id: pokemon.id,
                                name: pokemon.species.name,
                                imageUrl: pokemon.sprites.front_default,
                                type: pokemon.types[0].type.name,
                                minLvl: response.chain.evolves_to[0].evolution_details[0].min_level,
                                evolution: response.chain.evolves_to[0].evolves_to.length === 0 ? 'brak' : response.chain.evolves_to[0].evolves_to[0].species.name,
                            })
                        } else if (response.chain.evolves_to[0].evolves_to[0].species.name === pokemon.name) {
                            newPokemons.push({
                                id: pokemon.id,
                                name: pokemon.species.name,
                                imageUrl: pokemon.sprites.front_default,
                                type: pokemon.types[0].type.name,
                                minLvl: response.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
                                evolution: response.chain.evolves_to[0].evolves_to[0].evolves_to.length === 0 ? 'brak' : response.chain.evolves_to[0].evolves_to[0].species.name,
                            })
                        }
                        console.log(newPokemons);
                        if (newPokemons.length === 10) {
                            callback(newPokemons.sort((a, b) => a.id - b.id));
                        }
                    });
            });
    });
};

export default transformPokemons;