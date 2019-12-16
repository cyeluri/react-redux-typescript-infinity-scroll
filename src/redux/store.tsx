import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const initialState:any = {};

const middleware  = [thunk];

const store = createStore(allReducers, initialState, 
        compose(
        applyMiddleware(...middleware),
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())
    )
    ;

export default store;