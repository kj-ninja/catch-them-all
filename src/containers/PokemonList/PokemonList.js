import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchPokemons, getGender} from "../../store/actions/pokemons";
import useWindowWidth from "../../functions/customHooks/useWindowWidth";
import PaginationComponent from "../../components/Pagination/Pagination";
import PokemonItem from "./PokemonItem/PokemonItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import {PokedexContainer, PokedexHeaderRow, PokedexPaginationRow, PokedexCol} from "./PokemonList.styles";
import Search from "../../components/Search/Search";

const PokemonList = ({fetchPokemons, transformedPokemons, initialPokemons, loading, getGender}) => {
    const [paginate, setPaginate] = useState({
        limit: 100,
        offset: 0
    });
    const [totalPages, setTotalPages] = useState(null);
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const width = useWindowWidth();

    useEffect(() => {
        fetchPokemons(paginate, setTotalPages);
    }, [fetchPokemons, paginate]);

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

    const filteredPokemons = (arr) => {
        return arr.filter(item=> {
            return item.name.toLowerCase().includes(inputValue.toLowerCase())
        })
    };

    // TODO: pomyslec nad przeniesieniem funkcji sortujacych
    const sortByName = (sortMethod) => {
        if (sortMethod === 'ascending') {
            return filteredPokemons(transformedPokemons.sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            }));
        } else {
            return filteredPokemons(transformedPokemons.sort((a, b) => {
                return a.name > b.name ? -1 : 1;
            }));
        }
    };

    const reset = () => {
        return filteredPokemons(initialPokemons.sort((a, b)=> {
            return a.id - b.id;
        }));
    };

    const sortByGender = (gender) => {
        getGender(gender, transformedPokemons);
        return filteredPokemons(transformedPokemons);
    };

    // TODO: wydzielic to
    const sortByType = (type) => {
        const filteredArr = transformedPokemons.filter(item => item.type === type);
        switch (type) {
            case 'grass':
                return filteredPokemons(filteredArr);
            case 'fire':
                return filteredPokemons(filteredArr);
            case 'electric':
                return filteredPokemons(filteredArr);
            case 'water':
                return filteredPokemons(filteredArr);
            case 'bug':
                return filteredPokemons(filteredArr);
            case 'normal':
                return filteredPokemons(filteredArr);
            case 'poison':
                return filteredPokemons(filteredArr);
            case 'ground':
                return filteredPokemons(filteredArr);
            case 'fairy':
                return filteredPokemons(filteredArr);
            case 'fighting':
                return filteredPokemons(filteredArr);
            case 'psychic':
                return filteredPokemons(filteredArr);
            case 'rock':
                return filteredPokemons(filteredArr);
            case 'ghost':
                return filteredPokemons(filteredArr);
            case 'dragon':
                return filteredPokemons(filteredArr);
            case 'ice':
                return filteredPokemons(filteredArr);
            default:
                return transformedPokemons;
        }
    };

    return (
        <>
            <Search setInputValue={setInputValue} sort={sortByName} reset={reset} sortByGender={sortByGender} sortByType={sortByType} />
            <PokedexContainer>
                {width < 700 ?
                    <PokedexHeaderRow>
                        <PokedexCol width={10}>ID</PokedexCol>
                        <PokedexCol width={60}>NAZWA</PokedexCol>
                        <PokedexCol width={30}>TYP</PokedexCol>
                    </PokedexHeaderRow> :
                    <PokedexHeaderRow>
                        <PokedexCol width={10}>ID</PokedexCol>
                        <PokedexCol width={20}>POKEMON</PokedexCol>
                        <PokedexCol width={20}>NAZWA</PokedexCol>
                        <PokedexCol width={10}>MIN. LVL</PokedexCol>
                        <PokedexCol width={20}>TYP</PokedexCol>
                        <PokedexCol width={20}>EWOLUCJA</PokedexCol>
                    </PokedexHeaderRow>
                }
                {loading ? <Spinner/> :
                    filteredPokemons(transformedPokemons).map(pokemon => (
                        <PokemonItem key={pokemon.id} pokemon={pokemon}/>
                    ))
                }
            </PokedexContainer>
            <PokedexPaginationRow>
                <PaginationComponent
                    setActive={setActive}
                    setPaginate={setPaginate}
                    pages={pages}
                    active={active}
                    paginate={paginate}
                />
            </PokedexPaginationRow>
        </>
    );
};

const mapStateToProps = (state) => ({
   transformedPokemons: state.pokemons.transformedPokemons,
   initialPokemons: state.pokemons.initialPokemons,
    loading: state.pokemons.loading
});

export default connect(mapStateToProps, {fetchPokemons, getGender})(PokemonList);