import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {setPokemonToShow} from "../../../store/actions/pokemons";
import '../PokemonList.scss';

const PokemonItem = ({pokemon, setPokemonToShow}) => {
    const history = useHistory();

    const handleClick = (pokemon) => {
        setPokemonToShow(pokemon);
        history.push(`/pokemon/${pokemon.id}`);
    };

    return (
        <div className="row" onClick={() => handleClick(pokemon)}>
            <div className="col-1">{pokemon.id}</div>
            <div className="col-2"><img src={pokemon.imageUrl} alt="pokemon"/></div>
            <div className="col-2">{pokemon.name}</div>
            <div className="col-2">{pokemon.minLvl}</div>
            <div className="col-1">{pokemon.type}</div>
            <div className="col-2">{pokemon.evolution}</div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    pokemonToShow: state.pokemons.pokemonToShow
});

export default connect(mapStateToProps, {setPokemonToShow})(PokemonItem);