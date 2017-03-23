import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeStock } from '../actions';

class Stocks extends Component {

    removeStock(stock) {
        this.props.socket.emit('removeStock', stock);
        this.props.removeStock(stock);
    }
    
    renderStocks() {
        if(this.props.stocks) {
            return this.props.stocks.map((stock, index) => {
                return (
                    <div key= {index} className="stock-panel">
                        <div className="stock-name">
                            {stock}
                        </div>
                        <div onClick = {() => {this.removeStock(stock)}} className="close-icon">
                            X
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div className="stock-panel-group">
                {this.renderStocks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        stocks: state.stocksInfo.stocks,
        socket: state.socketInfo.socket
    }
}

export default connect(mapStateToProps, { removeStock })(Stocks);