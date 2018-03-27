/**
 * This File serves as the entry point for the
 * Speech recognition app.
 *
 * © Bears Team 14  - Chingu Voyage 4
 *
 * Authors: Atharva Pandey ( github.com/atharvajava ) 
 *          Shashank Shekhar ( shashank7200.github.io ), 
 *          Adeen Shukla ( github.com/adeen-s )
 */

// ==========================={ Imports }============================ //


import React from 'react';
import ReactDOM from 'react-dom';

import './styles/css/main.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// ======================= { Initial rendering } ===================== //
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
