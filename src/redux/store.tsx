import {createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducers from './reducers';


const initialState:any = {};

const middleware  = [thunk];

const store = createStore(
    allReducers,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
        )
    )
;

export default store;