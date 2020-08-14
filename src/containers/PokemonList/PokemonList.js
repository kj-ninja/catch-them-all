import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchPokemons} from "../../store/actions/pokemons";
import useWindowWidth from "../../functions/customHooks/useWindowWidth";
import PaginationComponent from "../../components/Pagination/Pagination";
import PokemonItem from "./PokemonItem/PokemonItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import {PokedexContainer, PokedexHeaderRow, PokedexPaginationRow, PokedexCol} from "./PokemonList.styles";

const PokemonList = ({fetchPokemons, transformedPokemons, loading}) => {
    const [paginate, setPaginate] = useState({
        limit: 10,
        offset: 0
    });
    const [totalPages, setTotalPages] = useState(null);
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState([]);
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

    return (
        <>
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
                        <PokedexCol width={20}>MIN. LVL</PokedexCol>
                        <PokedexCol width={10}>TYP</PokedexCol>
                        <PokedexCol width={20}>EWOLUCJA</PokedexCol>
                    </PokedexHeaderRow>
                }

                {loading ? <Spinner/> :
                    transformedPokemons.map(pokemon => (
                        <PokemonItem key={pokemon.id} pokemon={pokemon}/>
                    ))
                }
                <PokedexPaginationRow>
                    <PaginationComponent
                        setActive={setActive}
                        setPaginate={setPaginate}
                        pages={pages}
                        active={active}
                        paginate={paginate}
                    />
                </PokedexPaginationRow>
            </PokedexContainer>
        </>
    );
};

const mapStateToProps = (state) => ({
   transformedPokemons: state.pokemons.transformedPokemons,
    loading: state.pokemons.loading
});

export default connect(mapStateToProps, {fetchPokemons})(PokemonList);