import React, { Component } from 'react';
import { connect } from 'react-redux';

import { zoom } from '../actions';

class ZoomButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {"isZoomButtonActive": ["","","",""," zoom-button-hovered"]}
    }

    zoom(month) {
        let isZoomButtonActive = ["","","","",""];
        this.props.zoom(12/month);
        if(month === 1) {
            isZoomButtonActive[0] = " zoom-button-hovered";
        } else {
            const index = month/3;
            isZoomButtonActive[index] = " zoom-button-hovered";
        }
        this.setState({"isZoomButtonActive":isZoomButtonActive});
    }

    render(){
        return (
            <div className="zoom-buttons">
                <div className={"zoom-button" + this.state.isZoomButtonActive[0] }>
                    <div onClick = {() => this.zoom(1)} className="zoom-month">1m</div>
                </div>
                <div className={"zoom-button" + this.state.isZoomButtonActive[1] }>
                    <div onClick = {() => this.zoom(3)} className="zoom-month">3m</div>
                </div>
                <div className={"zoom-button" + this.state.isZoomButtonActive[2] }>
                    <div onClick = {() => this.zoom(6)} className="zoom-month">6m</div>
                </div>
                <div className={"zoom-button" + this.state.isZoomButtonActive[3] }>
                    <div onClick = {() => this.zoom(9)} className="zoom-month">9m</div>
                </div>
                <div className={"zoom-button" + this.state.isZoomButtonActive[4] }>
                    <div onClick = {() => this.zoom(12)} className="zoom-month">12m</div>
                </div>
            </div>
        );
    };
}

export default connect(null, { zoom } )(ZoomButtons);