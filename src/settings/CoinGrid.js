import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`

//lower section is all coins
//display the first 100 results fected from api so that application is not overly sluggish
export const getLowerSectionCoins = (coinList, filteredCoins) => {
    return (
        (filteredCoins && Object.keys(filteredCoins).slice(0, 100)) ||
        Object.keys(coinList).slice(0, 100)
    );
}

//top section is selected favorite coins
export const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => {
    return (
        topSection ? favorites : getLowerSectionCoins(coinList, filteredCoins)
    );
}

//map then display all coins
const CoinGrid = props => {
    const coinContext = useContext(AppContext);
    return (
        <CoinGridStyled>
            {getCoinsToDisplay(coinContext.coinList, props.topSection, coinContext.favoriteCoinList, coinContext.filteredCoins).map(coinKey => {
                return <CoinTile key={coinKey} topSection={props.topSection} coinKey={coinKey} />
            })}
        </CoinGridStyled>
    );
}

export default CoinGrid;