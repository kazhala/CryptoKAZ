import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');

const MAX_FAVORITES = 10;

export const AppContext = React.createContext({
    page: null,
    setPage: () => { },
    confirmFavorites: () => { },
    firstVisit: false,
    coinList: null,
    favoriteCoinList: ['BTC', 'ETC', 'XMR', 'DOGE'],
    addCoin: () => { },
    removeCoin: () => { },
    isInFavorites: () => { },
    filteredCoins: null,
    searchCoins: () => { },
    pricesState: null,
    currentFavorite: null,
    setFavorite: () => { }
});

const AppProvider = props => {
    const [pageState, setPageState] = useState('dashboard');
    //fist time vist state 
    const [visitState, setVisitState] = useState(false);
    const [coinList, setCoinList] = useState(null);
    const [favList, setFavList] = useState(['BTC', 'ETC', 'XMR', 'DOGE']);
    const [filteredCoins, setFilteredCoins] = useState(null);
    const [pricesState, setPrices] = useState(null);
    const [currentFavorite, setCurrentFavorite] = useState(null);

    useEffect(() => {
        console.log('effected');
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            setPageState('settings');
            setVisitState(true);
        } else if (cryptoDashData) {
            setFavList(cryptoDashData.favorites);
            setCurrentFavorite(cryptoDashData.currFav);
        }
        fetchCoins();
    }, []);

    useEffect(() => {
        if (coinList) {
            fetchPrices();
        }
        // eslint-disable-next-line
    }, [coinList]);

    useEffect(() => {
        if (coinList) {
            fetchPrices();
        }
        // eslint-disable-next-line
    }, [visitState]);


    const fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        console.log(coinList);
        setCoinList(coinList);
    }

    const fetchPrices = async () => {
        if (visitState) return;
        let prices = await pricesData();
        prices = prices.filter(price => Object.keys(price).length);
        console.log(prices);
        setPrices(prices);
    }

    const setFavorite = sym => {
        setCurrentFavorite(sym);
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currFav: sym,
        }))
    }

    const pricesData = async () => {
        let returnData = [];
        for (let i = 0; i < favList.length; i++) {
            try {
                let priceData = await cc.priceFull(favList[i], 'USD');
                returnData.push(priceData);
            } catch (error) {
                console.warn('Fetch price error: ', error);
            }
        }
        return returnData;
    }

    const setPage = page => {
        setPageState(page);
    }

    const addCoin = key => {
        let newList = [...favList];
        if (newList.length < MAX_FAVORITES) {
            newList.push(key);
            setFavList(newList);
        }
    }

    const removeCoin = key => {
        let newList = [...favList];
        _.pull(newList, key);
        setFavList(newList);
    }

    const confirmFavorites = () => {
        let currFav = favList[0];
        setCurrentFavorite(currFav);
        console.log('hello');
        setVisitState(false);
        setPageState('dashboard');
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: favList,
            currFav: currFav,
        }));
        fetchPrices();
    }

    const isInFavorites = key => {
        return _.includes(favList, key);
    }

    const searchCoins = filteredCoins => {
        setFilteredCoins(filteredCoins);
    }

    return (
        <AppContext.Provider value={{
            page: pageState,
            setPage: setPage,
            firstVisit: visitState,
            confirmFavorites: confirmFavorites,
            coinList: coinList,
            favoriteCoinList: favList,
            addCoin: addCoin,
            removeCoin: removeCoin,
            isInFavorites: isInFavorites,
            filteredCoins: filteredCoins,
            searchCoins: searchCoins,
            pricesState: pricesState,
            currentFavorite: currentFavorite,
            setFavorite: setFavorite
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppProvider;