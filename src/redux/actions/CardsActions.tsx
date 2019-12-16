import {FETCH_CARDS, SEARCH_CARDS, SEARCH_ONCHANGE} from './actionTypes';
import { Dispatch } from 'react';
// import axios library to make API calls
import axios from 'axios';

// each action creator needs to be a fucntion which needs to be exported.
//thunk middleware allow us to use to call the dispatch function directly to make async request

//es6 syntax

export const fetchCards = () =>  (dispatch:Dispatch<any>) => {        
        console.log('fetch Cards list');
        axios.get('https://api.magicthegathering.io/v1/cards?pageSize=20')
        .then(
            response => {
                let res: {type:string, payload:Array<any>} = {
                    type: FETCH_CARDS,
                    payload: response.data.cards
                }
                dispatch(res);
            }
        );              
    }

export const searchCardInputOnChange = (searchKey:string) => (dispatch:Dispatch<any>) => {
    console.log('search onchange event');
    let res: {type:string, payload:string} = {
        type: SEARCH_ONCHANGE,
        payload: searchKey
    }
    dispatch(res);
}

export const searchCards = (cardName:string) =>  (dispatch:Dispatch<any>) => {        
    console.log('search Cards list');
    axios.get('https://api.magicthegathering.io/v1/cards?pageSize=20'+';name='+cardName)
    .then(
        response => {
            let res: {type:string, payload:Array<any>} = {
                type: SEARCH_CARDS,
                payload: response.data.cards
            }
            dispatch(res);
        }
    );              
}