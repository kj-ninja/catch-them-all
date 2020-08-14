import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setPokemonToShow} from "../../../store/actions/pokemons";
import useWindowWidth from "../../../functions/customHooks/useWindowWidth";
import {PokemonRow, PokemonCol} from "./PokemonItem.styles";

const PokemonItem = ({pokemon, setPokemonToShow}) => {
    const history = useHistory();
    const width = useWindowWidth();

    const handleClick = (pokemon) => {
        setPokemonToShow(pokemon);
        history.push('/pokemon');
    };

    return (
            <PokemonRow className="row" onClick={() => handleClick(pokemon)}>
                {width < 700 ?
                    <>
                        <PokemonCol width={10}>{pokemon.id}</PokemonCol>
                        <PokemonCol width={30}><img src={pokemon.imageUrl} alt="pokemon"/></PokemonCol>
                        <PokemonCol width={30}>{pokemon.name.toUpperCase()}</PokemonCol>
                        <PokemonCol width={30}>{pokemon.type.toUpperCase()}</PokemonCol>

                    </> :
                    <>
                        <PokemonCol width={10}>{pokemon.id}</PokemonCol>
                        <PokemonCol width={20}><img src={pokemon.imageUrl} alt="pokemon"/></PokemonCol>
                        <PokemonCol width={20}>{pokemon.name.toUpperCase()}</PokemonCol>
                        <PokemonCol width={10}>{pokemon.minLvl}</PokemonCol>
                        <PokemonCol width={20}>{pokemon.type.toUpperCase()}</PokemonCol>
                        <PokemonCol width={20}>{pokemon.evolution.toUpperCase()}</PokemonCol>
                    </>
                }
            </PokemonRow>
    );
};

const mapStateToProps = (state) => ({
    pokemonToShow: state.pokemons.pokemonToShow
});

export default connect(mapStateToProps, {setPokemonToShow})(PokemonItem);