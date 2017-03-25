import { ADD_STOCK, AVAILABLE_STOCKS, REMOVE_STOCK, STOCK_DATA } from '../actions/types';

export default function(state = {stocks:[], data:{}}, action) {
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
        case STOCK_DATA:
            return {...state, data:action.payload};
    }
    return state;
}