import { combineReducers } from 'redux';
import stocksReducer from './stocks_reducer';
import socketReducer from './socket_reducer';

const rootReducer = combineReducers({
  stocksInfo: stocksReducer,
  socketInfo: socketReducer
});

export default rootReducer;
