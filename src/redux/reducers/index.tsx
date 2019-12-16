import cardsReducer  from './CardsReducer';
import isLoggedReducer  from './isLogged';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    cardsReducer,
    isLoggedReducer
});

export default allReducers;