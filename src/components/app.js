import React, { Component } from 'react';
import BrandName from './brand_name';
import ZoomButtons from './zoom_buttons';
import Chart from './chart';
import AddStock from './add_stock';
import Stocks from './stocks';

export default class App extends Component {
  render() {
    return (
      <div>
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
