import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addStock } from '../actions';

class AddStock extends Component {

    constructor(props) {
        super(props);
        this.state = {"stockName":"", "errorMessage":""}
    }

    addStock() {
        const stockName = this.state.stockName.toUpperCase();
        if(stockName) {
            if(this.props.stocks.indexOf(stockName) > -1) {
                this.setState({errorMessage: stockName+" is already present"});
            } else {
                this.props.socket.emit('addStock', stockName);
                this.props.addStock(stockName);
                this.setState({stockName:""}); 
            }
        }
    }

    updateStockName(e) {
        this.setState({"stockName":e.target.value});
        this.setState({errorMessage: ""});
    }

    submitOnEnter(e) {
        if(e.charCode === 13) {
            this.addStock();
        }
    }

    renderErrorMessage() {
        if(this.state.errorMessage) {
            return (
                <p className="errorMessage"> {this.state.errorMessage} </p>
            );
        }
    }

    render() {
        return (
            <div className="add-stock-container">
                <div className="add-stock input-group">
                <input  onChange={(e) => {this.updateStockName(e)}} 
                        onKeyPress = {(e) => {this.submitOnEnter(e)}}
                        value={this.state.stockName} 
                        type="text" 
                        className="form-control" 
                        placeholder="Add Stock Symbol" 
                        aria-describedby="basic-addon2" />
                <span onClick={()=>this.addStock()} 
                        className="add-button input-group-addon" 
                        id="basic-addon2">ADD</span>
                </div>
                {this.renderErrorMessage()}
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

export default connect(mapStateToProps, {addStock})(AddStock);