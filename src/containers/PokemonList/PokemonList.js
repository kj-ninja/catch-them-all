import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchPokemons} from "../../store/actions/pokemons";
import './PokemonList.scss';
import PaginationComponent from "../../components/Pagination/Pagination";
import PokemonItem from "./PokemonItem/PokemonItem";
import Spinner from "../../components/UI/Spinner/Spinner";

const PokemonList = ({fetchPokemons, transformedPokemons, loading}) => {
    const [paginate, setPaginate] = useState({
        limit: 10,
        offset: 0
    });
    const [totalPages, setTotalPages] = useState(null);
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        fetchPokemons(paginate, setTotalPages);
    }, [paginate]);

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
            <div className="pokedex">
                <div className="header row">
                    <div className="col-1">ID</div>
                    <div className="col-2">POKEMON</div>
                    <div className="col-2">NAZWA</div>
                    <div className="col-2">MIN. LVL</div>
                    <div className="col-1">TYP</div>
                    <div className="col-2">EWOLUCJA</div>
                </div>
                {loading ? <Spinner/> :
                    transformedPokemons.map(pokemon => (
                        <PokemonItem key={pokemon.id} pokemon={pokemon}/>
                    ))
                }
                <div className="pagination row">
                    <PaginationComponent
                        setActive={setActive}
                        setPaginate={setPaginate}
                        pages={pages}
                        active={active}
                        paginate={paginate}
                    />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
   transformedPokemons: state.pokemons.transformedPokemons,
    loading: state.pokemons.loading
});

export default connect(mapStateToProps, {fetchPokemons})(PokemonList);