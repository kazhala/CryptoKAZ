import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`

export const getCoinsToDisplay = coinList => {
    return Object.keys(coinList).slice(0, 100);
}

const CoinGrid = props => {
    const coinContext = useContext(AppContext);
    return (
        <CoinGridStyled>
            {getCoinsToDisplay(coinContext.coinList).map(coinKey => {
                return <CoinTile key={coinKey} coinKey={coinKey} />
            })}
        </CoinGridStyled>
    );
}

export default CoinGrid;