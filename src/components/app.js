import React, { Component } from 'react';
import BrandName from './brand_name';
import ZoomButtons from './zoom_buttons';
import Chart from './chart';
import AddStock from './add_stock';
import Stocks from './stocks';
import Socket from './socket';

export default class App extends Component {
  render() {
    return (
      <div>
        <Socket />
        <BrandName />
        <div className="outer-container">
          <ZoomButtons />
          <Chart />
          <AddStock />
          <Stocks />
        </div>
      </div>
    );
  }
}
