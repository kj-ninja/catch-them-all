import React from 'react';
import {connect} from 'react-redux';
import './Search.scss';
import {sortPokemons, resetPokemons} from '../../store/actions/pokemons';

const Search = ({inputValue, setInputValue, sort, sortPokemons, reset, sortByGender, resetPokemons, sortByType}) => {

    // TODO: dodac styled components (dodac kolory do buttonow type)
    return (
        <div className="search">
            <div className="card">
                <div className="search-input">
                    <label>Filter by Name</label>
                    <input type="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                           placeholder="Szukaj po nazwie..."/>
                </div>
                <div className="name">Sort by:</div>
                <div>
                    <button onClick={() => sortPokemons(sort('ascending'))}>A - Z
                    </button>
                    <button onClick={() => sortPokemons(sort('descending'))}>Z - A</button>
                    <button onClick={()=>sortPokemons(sortByGender('male'))}>płeć M</button>
                    <button onClick={()=>sortPokemons(sortByGender('female'))}>płeć Z</button>
                    <button onClick={() => resetPokemons(reset())}>reset</button>
                </div>
                <div className="name">Choose type:</div>
                <div>
                    {/*TODO: zmapowac to*/}
                    <button onClick={()=>sortPokemons(sortByType('grass'))}>grass</button>
                    <button onClick={()=>sortPokemons(sortByType('fire'))}>fire</button>
                    <button onClick={()=>sortPokemons(sortByType('electric'))}>electric</button>
                    <button onClick={()=>sortPokemons(sortByType('water'))}>water</button>
                    <button onClick={()=>sortPokemons(sortByType('bug'))}>bug</button>
                    <button onClick={()=>sortPokemons(sortByType('normal'))}>normal</button>
                    <button onClick={()=>sortPokemons(sortByType('poison'))}>poison</button>
                    <button onClick={()=>sortPokemons(sortByType('ground'))}>ground</button>
                    <button onClick={()=>sortPokemons(sortByType('fairy'))}>fairy</button>
                    <button onClick={()=>sortPokemons(sortByType('fighting'))}>fighting</button>
                    <button onClick={()=>sortPokemons(sortByType('psychic'))}>psychic</button>
                    <button onClick={()=>sortPokemons(sortByType('rock'))}>rock</button>
                    <button onClick={()=>sortPokemons(sortByType('ghost'))}>ghost</button>
                    <button onClick={()=>sortPokemons(sortByType('dragon'))}>dragon</button>
                    <button onClick={()=>sortPokemons(sortByType('ice'))}>ice</button>
                </div>
            </div>
        </div>
    );
};

export default connect(null, {sortPokemons, resetPokemons})(Search);