import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

const initialState:any = {};

const middleware  = [thunk];

const composeEnhancers =
    typeof window === 'object' &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const store = createStore(allReducers, 
                initialState, 
                compose(
                    applyMiddleware(...middleware),
                    composeEnhancers
                )
    );

export default store;