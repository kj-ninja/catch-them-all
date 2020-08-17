import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Logo from '../../assets/logo.png';
import Spinner from "../../components/UI/Spinner/Spinner";
import {getPokemonById} from "../../store/actions/pokemons";
import {
    PokemonContainer,
    PokemonLogo,
    PokemonDescription,
    PokemonButton,
    PokemonFooter,
    PokemonName,
    PokemonImage, PokemonSpecies
} from "./Pokemon.styles";

const Pokemon = ({pokemonToShow, loading, history, match, getPokemonById}) => {
    const {params: {pokemonId}} = match;

    useEffect(() => {
        getPokemonById(pokemonId);
    }, [getPokemonById, match, pokemonId]);

    const handlePreviousPokemon = (id) => {
        if (id === 1) {
            alert('To jest pierwszy pokemon na liście, sprawdź następne!');
        } else {
            history.push(`/pokemon/${id - 1}`);
            getPokemonById(id - 1);
        }
    };

    const handleNextPokemon = (id) => {
        history.push(`/pokemon/${id + 1}`);
        getPokemonById(id + 1);
    };

    if (!pokemonToShow) {
        return <Spinner/>;
    }

    return (
        <>
            <PokemonContainer>
                <PokemonLogo onClick={() => history.push('/')}><img src={Logo} alt="logo"/></PokemonLogo>
                {loading ? <Spinner/> :
                    <PokemonSpecies>
                        <PokemonImage>
                            <img src={pokemonToShow.imageUrl} alt="pokemon"/>
                        </PokemonImage>
                        <PokemonDescription>
                            <div><span>{pokemonToShow.name}</span> {pokemonToShow.japanName} - pokemon
                                typu {pokemonToShow.types.join(', ')}.
                                Znajduje się pod {pokemonToShow.pokedexNumber} numerem w pokedexie.
                            </div>
                            <div>
                                <p><span>Typ: </span>{pokemonToShow.types.join(' ')}</p>
                                <p><span>Płeć: </span></p>
                                <p><span>Region: </span>{pokemonToShow.region}</p>
                                <p><span>Występowanie w dziczy: </span></p>
                                <p><span>Możliwość złapania: </span></p>
                                <p><span>Występowanie Shiny: </span></p>
                                <p><span>Dodawany do kolekcji przez: </span></p>
                            </div>
                        </PokemonDescription>
                    </PokemonSpecies>
                }
                <PokemonFooter>
                    <PokemonButton onClick={() => handlePreviousPokemon(pokemonToShow.id)}>
                        <i className="fas fa-angle-left"/>Powrót
                    </PokemonButton>
                    <PokemonName>{pokemonToShow.id} {pokemonToShow.name.toUpperCase()}</PokemonName>
                    <PokemonButton onClick={() => handleNextPokemon(pokemonToShow.id)}>
                        Następny<i className="fas fa-angle-right"/>
                    </PokemonButton>
                </PokemonFooter>
            </PokemonContainer>
        </>

    );
};

const mapStateToProps = (state) => ({
    pokemonToShow: state.pokemons.pokemonToShow,
    loading: state.pokemons.loading
});

export default connect(mapStateToProps, {getPokemonById})(Pokemon);