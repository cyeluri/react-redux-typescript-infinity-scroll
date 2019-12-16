import {FETCH_CARDS} from '../actions/actionTypes'
import { Reducer } from 'react';

const payload:Array<object> = [];
const initialState:object = {
    payload
};

const cardsReducer:Reducer<any,  any> = (state:any = initialState, action: any) => {
    console.log('card reducer called');
    switch(action.type) {
        case FETCH_CARDS : {
            // return state copy using spread operator
             return {
                ...state,
                payload: action.payload
            }      
        }break;
        
        default: return state;
    }
};

export default cardsReducer;