import React from 'react';
import {useHistory} from 'react-router-dom';
import useWindowWidth from "../../../functions/customHooks/useWindowWidth";
import {PokemonRow, PokemonCol} from "./PokemonItem.styles";

const PokemonItem = ({pokemon}) => {
    const history = useHistory();
    const width = useWindowWidth();

    const handleClick = (pokemonId) => {
        history.push(`/pokemon/${pokemonId}`);
    };

    return (
            <PokemonRow className="row" onClick={() => handleClick(pokemon.id)}>
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

export default PokemonItem;