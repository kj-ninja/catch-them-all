import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import './Pokemon.scss';

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

const Pokemon = ({pokemonToShow}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const history = useHistory();

    useEffect(() => {
        P.getPokemonByName(pokemonToShow.name) // with Promise
            .then(function(response) {
                setImageUrl(response.sprites.other["official-artwork"].front_default);
            });
    }, []);

    if (!pokemonToShow && !imageUrl) {
        return <h1>BRAK POKEMONA</h1>
    }

    return (
        <div className="pokemon">
            <div className="logo" onClick={()=>history.push('/')}><img src={Logo} alt="logo"/></div>
            <div className="pokemon-container">
                <div className="pokemon-image"><img src={imageUrl} alt="pokemon"/></div>
                <div className="pokemon-stats">Statystyki?</div>
            </div>
            <div>{pokemonToShow.id} {pokemonToShow.name.toUpperCase()}</div>
        </div>
    );
};

const mapStateToProps = (state) => ({
   pokemonToShow: state.pokemons.pokemonToShow
});

export default connect(mapStateToProps)(Pokemon);