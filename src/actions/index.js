import { ADD_STOCK, AVAILABLE_STOCKS, SOCKET, REMOVE_STOCK } from './types';

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