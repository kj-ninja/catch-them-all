import React from 'react';
import {connect} from 'react-redux';
import './Search.scss';
import {sortPokemons} from '../../store/actions/pokemons';

const Search = ({inputValue, setInputValue, sort, sortPokemons, reset, sortByGender}) => {


    return (
        <div className="search">
            <div className="card">
                <div className="search-input">
                    <label>Filter by Name</label>
                    <input type="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                           placeholder="Szukaj po nazwie..."/>
                </div>
                <div>Sort by:</div>
                <div>
                    <button onClick={() => sortPokemons(sort('ascending'))}>A - Z
                    </button>
                    <button onClick={() => sortPokemons(sort('descending'))}>Z - A</button>
                    <button onClick={sortByGender}>płeć</button>
                    <button onClick={() => sortPokemons(reset())}>reset</button>
                </div>
                <div>Choose type</div>
                <div>
                    <button>grass</button>
                    <button>fire</button>
                    <button>electric</button>
                    <button>water</button>
                    <button>bug</button>
                    <button>normal</button>
                    <button>poison</button>
                    <button>ground</button>
                    <button>fairy</button>
                    <button>fighting</button>
                    <button>psychic</button>
                    <button>rock</button>
                    <button>ghost</button>
                    <button>dragon</button>
                    <button>ice</button>
                </div>
            </div>
        </div>
    );
};

export default connect(null, {sortPokemons})(Search);