import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Logo from '../../assets/logo.png';
import Spinner from "../../components/UI/Spinner/Spinner";
import {getPokemonById} from "../../store/actions/pokemons";
import {
    PokemonContainer,
    PokemonLogo,
    PokemonButton,
    PokemonFooter,
    PokemonName,
    PokemonImage
} from "./Pokemon.styles";

const Pokemon = ({pokemonToShow, loading, history, match, getPokemonById}) => {

    useEffect(() => {
        const {params: {pokemonId}} = match;

        getPokemonById(pokemonId);
    }, [getPokemonById, match]);

    const handlePreviousPokemon = (id) => {
        if (id === 0) {
            alert('To jest pierwszy pokemon na liście, sprawdź następne!');
        }
        console.log(id);
    };

    const handleNextPokemon = (id) => {
        console.log(id);
    };

    return (
        <>
            {loading ? <Spinner/> :
                <PokemonContainer>
                    <PokemonLogo onClick={() => history.push('/')}><img src={Logo} alt="logo"/></PokemonLogo>
                    <PokemonImage><img src={pokemonToShow.imageUrl} alt="pokemon"/></PokemonImage>
                    <PokemonFooter>
                        <PokemonButton onClick={() => handlePreviousPokemon(pokemonToShow.id - 1)}>
                            <i className="fas fa-angle-left"/>Powrót
                        </PokemonButton>
                        <PokemonName>{pokemonToShow.id} {pokemonToShow.name.toUpperCase()}</PokemonName>
                        <PokemonButton onClick={()=>handleNextPokemon(pokemonToShow.id)}>
                            Następny<i className="fas fa-angle-right"/>
                        </PokemonButton>
                    </PokemonFooter>
                </PokemonContainer>
            }
        </>

    );
};

const mapStateToProps = (state) => ({
    pokemonToShow: state.pokemons.pokemonToShow,
    loading: state.pokemons.loading
});

export default connect(mapStateToProps, {getPokemonById})(Pokemon);