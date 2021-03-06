import React, { useContext } from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';
import { AppContext } from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
`

const SearchInput = styled.input` 
    ${backgroundColor2}
    color: #1163c9;
    ${fontSize2}
    border: 1px solid;
    height: 25px;
    place-self: center left;
`

//debounce setted so that application won't execute every time user type a character
//execute this function when user stop typing for 500 ms
const handleFilter = _.debounce((inputValue, coinList, searchFilter) => {
    //get all the coin symbols
    let coinSymbols = Object.keys(coinList);
    //get all the coin names
    let coinName = coinSymbols.map(symbol => coinList[symbol].CoinName);
    //combine the two coin property
    let allStringsSearch = coinSymbols.concat(coinName);
    //use fuzzy library to handle fuzzy search
    let fuzzyResult = fuzzy
        .filter(inputValue, allStringsSearch, {})
        .map(result => {
            return result.string;
        });
    //get coins for both searching symbol or full name
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return (_.includes(fuzzyResult, symKey) || _.includes(fuzzyResult, coinName));
    });
    searchFilter(filteredCoins);
    //console.log(filteredCoins);
}, 500);

const filterCoins = (e, searchInput, coinList) => {
    let inputValue = e.target.value;
    if (!inputValue) {
        searchInput(null);
        return;
    }
    handleFilter(inputValue, coinList, searchInput);
}

const Search = props => {
    const searchContext = useContext(AppContext);
    //console.log(searchContext.filteredCoins);
    return (
        <SearchGrid>
            <h2>Search all coins</h2>
            <SearchInput onKeyUp={(e) => filterCoins(e, searchContext.searchCoins, searchContext.coinList)} />
        </SearchGrid>
    );
}

export default Search;