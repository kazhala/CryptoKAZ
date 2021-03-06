import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

//display welcome message if user is first time visitor
const WelcomeMessage = props => {
    const appContext = useContext(AppContext);
    let displayWelcom = <h1>Welcome to CryptoKAZ, please select your favorite coins to begin. {' '}</h1>;
    if (!appContext.firstVisit) {
        displayWelcom = null;
    }
    return (
        <div>
            {displayWelcom}

        </div>
    );
}

export default WelcomeMessage;