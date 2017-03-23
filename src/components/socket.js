import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { addStock, flushAvailableStocks, shareSocket, removeStock } from '../actions';
import { STOCK_WATCH_SERVER_URI } from '../actions/uris';

class Socket extends Component {

    componentDidMount() {
        this.socket = io(STOCK_WATCH_SERVER_URI);
        this.props.shareSocket(this.socket);
        this.socket.on('newlyReceivedStock', stock => {
            this.props.addStock(stock.stockName);
        });
        this.socket.on('availableStocks', stocks => {
            this.props.flushAvailableStocks(stocks.availableStocks);
        });
        this.socket.on('newlyRemovedStock', stock => {
            this.props.removeStock(stock.stockName);
        });
    }
    
    render() {
        return false;
    }
}

export default connect(null, { addStock, flushAvailableStocks, shareSocket, removeStock }) (Socket);