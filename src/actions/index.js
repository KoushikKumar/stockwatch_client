import axios from 'axios';

import { ADD_STOCK, AVAILABLE_STOCKS, SOCKET, REMOVE_STOCK, STOCK_DATA } from './types';
import { GET_STOCK_DATA_URI } from './uris';

export function addStock(stockName) {
    return {
        type:ADD_STOCK,
        payload:stockName
    }
}

export function removeStock(stockName) {
    return {
        type: REMOVE_STOCK,
        payload: stockName
    }
}

export function flushAvailableStocks(availableStocks) {
    return {
        type: AVAILABLE_STOCKS,
        payload: availableStocks
    };
}

export function shareSocket(socket) {
    return {
        type : SOCKET,
        payload: socket
    }
}

export function getChartData() {
    return function(dispatch) {
        axios.get(GET_STOCK_DATA_URI)
            .then(response => {
                dispatch({ type: STOCK_DATA, payload:response.data});
            })
    }
}