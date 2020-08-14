import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Logo from '../../assets/logo.png';
import Spinner from "../../components/UI/Spinner/Spinner";
import {setPokemonToShowAsync, getPokemonImage} from "../../store/actions/pokemons";
import {PokemonContainer, PokemonLogo, Container, PokemonButton, PokemonFooter, PokemonName, PokemonStats} from "./Pokemon.styles";

const Pokemon = ({pokemonToShow, setPokemonToShowAsync, loading, pokemonImage, getPokemonImage}) => {
    const history = useHistory();

    useEffect(() => {
        getPokemonImage(pokemonToShow.name);
    }, [pokemonToShow.name, getPokemonImage]);

    const handlePreviousPokemon = (id) => {
        if (id === 0) {
            alert('To jest pierwszy pokemon na liście, sprawdź następne!');
        }
        setPokemonToShowAsync(id)
    }

    return (
        <>
            {loading ? <Spinner/> :
                <PokemonContainer>
                    <PokemonLogo onClick={() => history.push('/')}><img src={Logo} alt="logo"/></PokemonLogo>
                    <Container>
                        <div className="pokemon-image"><img src={pokemonImage} alt="pokemon"/></div>
                        <PokemonStats className="pokemon-stats"></PokemonStats>
                    </Container>
                    <PokemonFooter>
                        <PokemonButton onClick={() => handlePreviousPokemon(pokemonToShow.id - 1)}>
                            <i className="fas fa-angle-left"/>Powrót
                        </PokemonButton>
                        <PokemonName>{pokemonToShow.id} {pokemonToShow.name.toUpperCase()}</PokemonName>
                        <PokemonButton onClick={() => setPokemonToShowAsync(pokemonToShow.id + 1)}>
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
    loading: state.pokemons.loading,
    pokemonImage: state.pokemons.pokemonImage
});

export default connect(mapStateToProps, {setPokemonToShowAsync, getPokemonImage})(Pokemon);