import {FETCH_CARDS} from './actionTypes';
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

