import { ADD_STOCK, AVAILABLE_STOCKS, REMOVE_STOCK } from '../actions/types';

export default function(state = {stocks:[]}, action) {
    switch(action.type) {
        case ADD_STOCK:
            return {...state, stocks: [action.payload, ...state.stocks]};
        case AVAILABLE_STOCKS:
            return {...state, stocks:action.payload }
        case REMOVE_STOCK:
            let updatedStocks = state.stocks.filter((stock) => {
                return stock !== action.payload;
            })
            return {...state, stocks:updatedStocks};
        
    }
    return state;
}