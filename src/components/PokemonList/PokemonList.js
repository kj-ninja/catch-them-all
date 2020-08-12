import React, {useEffect, useState} from 'react';
import './PokemonList.scss';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [pokemonsEvolutionChain, setPokemonsEvolutionChain] = useState([]);
    const [transformedChains, setTransformedChains] = useState([]);

    const interval = {
        limit: 10,
        offset: 10
    };

    const metoda = (pokemony, chains) => {
        const result = [];
        // metoda powinna zwrocic 10 przerobionych obiektow
        // sprawdza jaki pokemon jest na poczatku i robi petle po chain szukajac tego samego imienia
        // po znalezieniu sprawdza czy tablica evolves_to jest pusta?
        pokemony.forEach((pokemon, i) => {
            console.log(pokemon.name);
            chains.forEach((chain, j) => {
                if (pokemon.name === chain.chain.species.name) {
                    result.push({
                        id: pokemon.id,
                        imageUrl: pokemon.sprites.front_default,
                        name: pokemon.name,
                        minLvl: chain.chain.evolution_details.length === 0 ? 1 : chain.chain.evolution_details[0].min_level,
                        evolution: chain.chain.evolves_to[0].species.name,
                        type: pokemon.types[0].type.name
                    });
                } else if (pokemon.name === chain.chain.evolves_to[0].species.name) {
                    console.log('true');
                    result.push({
                        id: pokemon.id,
                        imageUrl: pokemon.sprites.front_default,
                        name: pokemon.name,
                        minLvl: chain.chain.evolves_to[0].evolution_details[0].min_level,
                        evolution: chain.chain.evolves_to[0].evolves_to.length === 0 ? 'brak' : chain.chain.evolves_to[0].evolves_to[0].species.name,
                        type: pokemon.types[0].type.name
                    });
                    console.log('koniec');
                } else if (pokemon.name === chain.chain.evolves_to[0].evolves_to[0].species.name) {
                    result.push({
                        id: pokemon.id,
                        imageUrl: pokemon.sprites.front_default,
                        name: pokemon.name,
                        minLvl: chain.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
                        evolution: 'brak',
                        type: pokemon.types[0].type.name
                    });
                }
            })
        });
        setTransformedChains(result);
        console.log(result);
    };

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                // fetchuje 10 pokemonow od poczatku
                const pokemonsList = await P.getPokemonsList(interval);

                // tworze arrayke z 10 nazwami pokemonow
                const pokemonsNames = pokemonsList.results.map(pokemon => pokemon.name);

                // dodaje do stanu 10 obiektow pokemonow
                const pokemons = await P.getPokemonByName(pokemonsNames)
                setPokemons(pokemons);
                console.log(pokemons);

                // biore tylko te id ktore maja chaina moich pokemonow
                const arrayOfPokemonsId = pokemons.map(pokemon => Math.ceil((pokemon.id / 3)));
                const setOfPokemonsId = new Set(arrayOfPokemonsId);
                const pokemonEvolutionChainById = await P.getEvolutionChainById([...setOfPokemonsId]);
                setPokemonsEvolutionChain(pokemonEvolutionChainById);
                console.log(pokemonEvolutionChainById);

                metoda(pokemons, pokemonEvolutionChainById);

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
                <div className="col-2">EVOLUCJA</div>
            </div>
            {transformedChains.length === 0 ? <h1>Loading...</h1> :
                transformedChains.map(({name, id, imageUrl, type, evolution, minLvl}) => (
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