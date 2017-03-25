import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { removeStock } from '../actions';

const color = ["1676b6", "adc6ea", "ff7f00", "ffbb72", "24a122", 
                "96e086", "d8241f", "ff9794", "9564bf", "c5afd6",
                "8d564a", "c59c93", "e574c3", "f9b5d2", "7f7f7f",
                "c7c7c7", "bcbe00", "dbdc88", "00bed0", "9cdae6"];
class Stocks extends Component {

    removeStock(stock) {
        this.props.socket.emit('removeStock', stock);
        this.props.removeStock(stock);
    }
    
    renderStockPanel(stock, index) {
        const borderColor = {
            borderLeft:"3px solid #"+color[index]
        }
        return (
            <div key= {index} className="stock-panel" style = {borderColor}>
                <div className="stock-name">
                    {stock}
                </div>
                <div onClick = {() => {this.removeStock(stock)}} className="close-icon">
                    X
                </div>
            </div>
        );
    };

    renderStocks() {
        if(this.props.stocks) {
            return this.props.stocks.map((stock, index) => {
                return this.renderStockPanel(stock, index)
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