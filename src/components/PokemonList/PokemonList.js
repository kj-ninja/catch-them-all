import React, {useEffect, useState, useCallback} from 'react';
import {Route} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import './PokemonList.scss';
import transformPokemons from "../../functions/transformPokemons";
import PaginationComponent from "../Pagination/Pagination";
import Pokemon from "../Pokemon/Pokemon";

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const PokemonList = () => {
    const history = useHistory();
    const [transformedPokemons, setTransformedPokemons] = useState([]);
    const [paginate, setPaginate] = useState({
        limit: 10,
        offset: 0
    });
    const [pokemonToShow, setPokemonToShow] = useState(null);
    const [totalPages, setTotalPages] = useState(null);
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        if (active <= 4) {
            setPages([1, 2, 3, 4, 5, "...", totalPages]);
        }
        if (active > 4 && active < totalPages - 3) {
            setPages([1, "...", active - 1, active, active + 1, "...", totalPages]);
        }
        if (active > totalPages - 4) {
            setPages([1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
        }
    }, [active, totalPages]);

    const handleClick = useCallback(e => {
        if (e.target.value === 0) {
            return;
        }
        if (e.target.value === 1) {
            setPaginate({
                ...paginate,
                offset: 0
            });
        }
        setPaginate({
            ...paginate,
            offset: (e.target.value - 1) * 10
        });
        setActive(e.target.value);
    }, []);

    useEffect(() => {
        P.getNatureByName("bold")
            .then(function(response) {
                console.log(response);
            });
        const fetchPokemons = async () => {
            try {
                // fetchujemy pierwsze 10 pokemonow
                const pokemonsList = await P.getPokemonsList(paginate);
                // zapisujemy ilosc pokemonow
                setTotalPages(Math.ceil(pokemonsList.count / paginate.limit));
                const pokemonsNames = pokemonsList.results.map(pokemon => pokemon.name);
                const pokemonsArr = await P.getPokemonByName(pokemonsNames)

                transformPokemons(pokemonsArr, setTransformedPokemons);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPokemons();
    }, [paginate]);

    return (
        <>
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
                    transformedPokemons.map(pokemon => (
                        <div className="row" key={pokemon.id} onClick={() => {
                            setPokemonToShow(pokemon);
                            history.push('/pokemon');
                        }
                        }>
                            <div className="col-1">{pokemon.id}</div>
                            <div className="col-2"><img src={pokemon.imageUrl} alt="pokemon"/></div>
                            <div className="col-2">{pokemon.name}</div>
                            <div className="col-2">{pokemon.minLvl}</div>
                            <div className="col-1">{pokemon.type}</div>
                            <div className="col-2">{pokemon.evolution}</div>
                        </div>
                    ))
                }
                <div className="pagination row">
                    <PaginationComponent
                        handleClick={handleClick}
                        pages={pages}
                        active={active}
                    />
                </div>
            </div>
            <Route exact path="/pokemon" render={()=><Pokemon pokemon={pokemonToShow}/>}/>
        </>
    );
};

export default PokemonList;