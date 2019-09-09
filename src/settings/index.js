import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import CoinGrid from './CoinGrid';

const Settings = props => {
    return (
        <div>
            <WelcomeMessage />
            <ConfirmButton />
            <CoinGrid />
        </div>
    );
}

export default Settings;