import React, {useEffect, useState} from 'react';
import './PokemonList.scss';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonList = () => {
    const [transformedPokemons, setTransformedPokemons] = useState([]);

    const interval = {
        limit: 10,
        offset: 20
    };

    const transformPokemons = (pokemons) => {
        const newPokemons = [];

        pokemons.forEach(pokemon => {
            P.getPokemonSpeciesByName(pokemon.name)
                .then(function (response) {

                    P.resource(response.evolution_chain.url)
                        .then(function (response) {
                            console.log(response.chain);

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
                        });
                });
        });

        setTimeout(()=> {setTransformedPokemons(newPokemons.sort((a, b) => a.id - b.id));}, 2000);


        // metoda powinna zwrocic 10 przerobionych obiektow
        // sprawdza jaki pokemon jest na poczatku i robi petle po chain szukajac tego samego imienia
        // po znalezieniu sprawdza czy tablica evolves_to jest pusta?

        // pokemony.forEach((pokemon, i) => {
        //     console.log(pokemon.name);
        //     chains.forEach((chain, j) => {
        //         if (pokemon.name === chain.chain.species.name) {
        //             result.push({
        //                 id: pokemon.id,
        //                 imageUrl: pokemon.sprites.front_default,
        //                 name: pokemon.name,
        //                 minLvl: chain.chain.evolution_details.length === 0 ? 1 : chain.chain.evolution_details[0].min_level,
        //                 evolution: chain.chain.evolves_to[0].species.name,
        //                 type: pokemon.types[0].type.name
        //             });
        //         } else if (pokemon.name === chain.chain.evolves_to[0].species.name) {
        //             console.log('true');
        //             result.push({
        //                 id: pokemon.id,
        //                 imageUrl: pokemon.sprites.front_default,
        //                 name: pokemon.name,
        //                 minLvl: chain.chain.evolves_to[0].evolution_details[0].min_level,
        //                 evolution: chain.chain.evolves_to[0].evolves_to.length === 0 ? 'brak' : chain.chain.evolves_to[0].evolves_to[0].species.name,
        //                 type: pokemon.types[0].type.name
        //             });
        //             console.log('koniec');
        //         } else if (pokemon.name === chain.chain.evolves_to[0].evolves_to[0].species.name) {
        //             result.push({
        //                 id: pokemon.id,
        //                 imageUrl: pokemon.sprites.front_default,
        //                 name: pokemon.name,
        //                 minLvl: chain.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
        //                 evolution: 'brak',
        //                 type: pokemon.types[0].type.name
        //             });
        //         }
        //     })
        // });
        // setTransformedChains(result);
        // console.log(result);
    };

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                // fetchuje 10 pierwszych pokemonow
                const pokemonsList = await P.getPokemonsList(interval);
                // tworze arrayke z 10 pierwszymi nazwami pokemonow
                const pokemonsNames = pokemonsList.results.map(pokemon => pokemon.name);
                // dodaje do stanu 10 pierwszych pokemonow
                const pokemonsArr = await P.getPokemonByName(pokemonsNames)

                transformPokemons(pokemonsArr);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <div className="pokedex">
            <div className="header row">
                <div className="col-1">ID</div>
                <div className="col-2">POKEMON</div>
                <div className="col-2">NAZWA</div>
                <div className="col-2">MIN. LVL</div>
                <div className="col-1">TYP</div>
                <div className="col-2">EWOLUCJA</div>
            </div>
            {transformedPokemons.length === 0 ? <h1>Loading...</h1> :
                transformedPokemons.map(({name, id, imageUrl, type, evolution, minLvl}) => (
                    <div className="row" key={id}>
                        <div className="col-1">{id}</div>
                        <div className="col-2"><img src={imageUrl} alt="pokemon"/></div>
                        <div className="col-2">{name}</div>
                        <div className="col-2">{minLvl}</div>
                        <div className="col-1">{type}</div>
                        <div className="col-2">{evolution}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default PokemonList;