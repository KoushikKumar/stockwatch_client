import React, { Component } from 'react';

export default class AddStock extends Component {
    render() {
        return (
            <div className="add-stock input-group">
              <input type="text" className="form-control" placeholder="Add Stock Symbol" aria-describedby="basic-addon2" />
              <span className="input-group-addon" id="basic-addon2">ADD</span>
            </div>
        );
    }
}