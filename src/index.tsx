import React from 'react';
import ReactDOM from 'react-dom';
import './scss/_index.scss';
import App from './App';

import { createStore } from 'redux';
// This import is the combined of all the reducers in the application
import allReducer from './redux/reducers';
//Providers - connects global state to entire App
import {Provider} from 'react-redux';
import store from './redux/store';


//Wrap entire App with provider to pass the store to all the components
ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    , document.getElementById('root')
);
