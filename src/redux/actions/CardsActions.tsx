import {FETCH_CARDS, SEARCH_CARDS, SEARCH_ONCHANGE, SHOW_LOADING} from './actionTypes';
import { Dispatch } from 'react';
// import axios library to make API calls
import axios from 'axios';

// each action creator needs to be a fucntion which needs to be exported.
//thunk middleware allow us to use to call the dispatch function directly to make async request

//es6 syntax

/**Creating a interface to pass the parameters to fetch results in sort order along with size */
export interface FetchParams {
    pageSize:string,
    type:string,
    name:string
}

export const CARD_TYPE = 'Creature';
let page:number = 0;
let cardName:string = "";
let totalCards:number = 0;

/**
 * this method invokes the cards API to fetch results.
 */
export const fetchCards = () =>  (dispatch:Dispatch<any>) => {        
        console.log('fetch Cards list');
        let responseHeader:any = {};
        let payload:Array<string> = [];
        let type:string = FETCH_CARDS;
        page = page + 1;
        axios.get('https://api.magicthegathering.io/v1/cards?pageSize=20;type='+CARD_TYPE+';page='+page + ';name='+ cardName)
        .then(
            response => {
                responseHeader = response.headers;
                //Read values from header
                totalCards = responseHeader['total-count'];
                payload = response.data.cards;
                //Sort the response with name as default. The API doesn't have any filters to pass for sort. we have to do in memory
                payload.sort(function (a:string, b:string) {
                    return a > b ? -1 : 1
                  });

                  dispatch({type,payload,totalCards});
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
/**
 * 
 * @param cardParam This method takes input from the search form to fetch the cards based on name
 */
export const searchCards = (cardParam:string) =>  (dispatch:Dispatch<any>) => {   
    //Reseting the page count when we do the search     
    page = 0;
    cardName = cardParam;
    console.log('search Cards list');
    axios.get('https://api.magicthegathering.io/v1/cards?pageSize=20;type='+CARD_TYPE+';name='+cardName)
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
/**
 * This method set the flag to show loading.
 * @param isLoading 
 */
export const setIsLoading = (isLoading:boolean) => (dispatch:Dispatch<any>) => {
    dispatch({type:SHOW_LOADING, isLoading});
}