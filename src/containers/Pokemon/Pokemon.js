import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './Pokemon.scss';
import Spinner from "../../components/UI/Spinner/Spinner";
import {setPokemonToShowAsync, getPokemonImage} from "../../store/actions/pokemons";

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const Pokemon = ({pokemonToShow, setPokemonToShowAsync, loading, pokemonImage, getPokemonImage}) => {
    const history = useHistory();

    useEffect(() => {
        getPokemonImage(pokemonToShow.name);
    }, [pokemonToShow.name]);

    const handleNextPokemon = (id) => {
        setPokemonToShowAsync(id)
    };

    const handlePreviousPokemon = (id) => {
        console.log(id);
        if (id === 0) {
            alert('To jest pierwszy pokemon na liście, sprawdź następne!');
        }
        setPokemonToShowAsync(id)
    }

    return (
        <div className="pokemon">
            <div className="logo" onClick={() => history.push('/')}><img src={Logo} alt="logo"/></div>
            {loading ? <Spinner/> :
            <>
                <div className="pokemon-container">
                    <div className="pokemon-image"><img src={pokemonImage} alt="pokemon"/></div>
                    <div className="pokemon-stats"></div>
                </div>
                <div className="pokemon-footer">
                    <div onClick={() => handlePreviousPokemon(pokemonToShow.id - 1)}>Powrót</div>
                    <div>{pokemonToShow.id} {pokemonToShow.name.toUpperCase()}</div>
                    <div onClick={() => handleNextPokemon(pokemonToShow.id + 1)}>Następny</div>
                </div>
            </>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    pokemonToShow: state.pokemons.pokemonToShow,
    loading: state.pokemons.loading,
    pokemonImage: state.pokemons.pokemonImage
});

export default connect(mapStateToProps, {setPokemonToShowAsync, getPokemonImage})(Pokemon);