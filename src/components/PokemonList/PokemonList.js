import React, {useEffect, useState} from 'react';
import './PokemonList.scss';
import transformPokemons from "../../functions/transformPokemons";

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonList = () => {
    const [transformedPokemons, setTransformedPokemons] = useState([]);
    const [pokemonsToShow, setPokemonsToShow] = useState([]);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const []
    const pageNumbers = [];

    const changePage = (e, i) => {
        if (i=== 1) {
            setOffset(0);
            setCurrentPage(i);
        }
        setOffset((i - 1) * 10);
        setCurrentPage(i);
    };

    if (count) {
        for (let i = 1; i <= Math.ceil(count / limit); i++) {
            const element = <li onClick={(e)=>changePage(e, i)} className="col-1" key={i}>{i}</li>;
            pageNumbers.push(element);
        }
        console.log(pageNumbers);
    }

    const interval = {
        limit: 10,
        offset: 0
    };

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                // fetchujemy pierwsze 10 pokemonow
                const pokemonsList = await P.getPokemonsList(interval);
                // zapisujemy ilosc pokemonow
                setCount(pokemonsList.count);
                const pokemonsNames = pokemonsList.results.map(pokemon => pokemon.name);
                const pokemonsArr = await P.getPokemonByName(pokemonsNames)

                transformPokemons(pokemonsArr, setTransformedPokemons);
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
            <div className="pagination row">
                <div className="col-1">w lewo</div>
                {pageNumbers.length !== 0 ? pageNumbers.slice() : null}
                <div className="col-1">w prawo</div>
            </div>
        </div>
    );
};

export default PokemonList;