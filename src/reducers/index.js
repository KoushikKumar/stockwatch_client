import { combineReducers } from 'redux';
import stocksReducer from './stocks_reducer';
import socketReducer from './socket_reducer';
import zoomReducer from './zoom_reducer';

const rootReducer = combineReducers({
  stocksInfo: stocksReducer,
  socketInfo: socketReducer,
  zoom:zoomReducer
});

export default rootReducer;
