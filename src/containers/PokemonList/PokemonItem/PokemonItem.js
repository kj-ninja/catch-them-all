import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setPokemonToShow} from "../../../store/actions/pokemons";
import {PokemonRow, PokemonCol} from "./PokemonItem.styles";

const PokemonItem = ({pokemon, setPokemonToShow}) => {
    const history = useHistory();

    const handleClick = (pokemon) => {
        setPokemonToShow(pokemon);
        history.push('/pokemon');
    };

    return (
        <PokemonRow className="row" onClick={() => handleClick(pokemon)}>
            <PokemonCol width={10}>{pokemon.id}</PokemonCol>
            <PokemonCol width={20}><img src={pokemon.imageUrl} alt="pokemon"/></PokemonCol>
            <PokemonCol width={20}>{pokemon.name.toUpperCase()}</PokemonCol>
            <PokemonCol width={10}>{pokemon.minLvl}</PokemonCol>
            <PokemonCol width={20}>{pokemon.type.toUpperCase()}</PokemonCol>
            <PokemonCol width={20}>{pokemon.evolution.toUpperCase()}</PokemonCol>
        </PokemonRow>
    );
};

const mapStateToProps = (state) => ({
    pokemonToShow: state.pokemons.pokemonToShow
});

export default connect(mapStateToProps, {setPokemonToShow})(PokemonItem);