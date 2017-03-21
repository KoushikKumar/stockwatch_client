import React, { Component } from 'react';

export default class ZoomButtons extends Component {
    render(){
        return (
            <div className="zoom-buttons">
                <div className="zoom-button">
                    <div className="zoom-month">1m</div>
                </div>
                <div className="zoom-button">
                    <div className="zoom-month">3m</div>
                </div>
                <div className="zoom-button">
                    <div className="zoom-month">6m</div>
                </div>
                <div className="zoom-button">
                    <div className="zoom-month">9m</div>
                </div>
                <div className="zoom-button">
                    <div className="zoom-month">12m</div>
                </div>
            </div>
        );
    };
}