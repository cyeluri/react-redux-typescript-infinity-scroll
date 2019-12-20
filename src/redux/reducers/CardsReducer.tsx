import {FETCH_CARDS, SEARCH_CARDS, SEARCH_ONCHANGE} from '../actions/actionTypes'
import { Reducer } from 'react';

const cards:Array<object> = [];
const searchKey:string = '';

const initialState:object = {
    cardsPayload: cards,
    totalCards:0,
    searchKey
};

const cardsReducer:Reducer<any,  any> = (state:any = initialState, action: any) => {
    console.log('card reducer called');
    switch(action.type) {
        case FETCH_CARDS : {
            // return state copy using spread operator
            // Combining the previous cards with newly fetch data.
             return {
                ...state,
                cardsPayload: [...state.cardsPayload, ...action.payload],
                totalCards:action.totalCards
            }            
        };break;

        case SEARCH_CARDS : {
            return {
                ...state,
                cardsPayload: action.payload
            }      
        };break;
 
        case SEARCH_ONCHANGE : {
            return {
                ...state,
                searchKey: action.payload
            }      
        };break;
 
        default: return state;
    }
};

export default cardsReducer;