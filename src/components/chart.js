import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';

import { getChartData } from '../actions';

let stockGraph;
class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {"hello":"Hi"};
    }

    componentWillMount() {
        this.props.getChartData();
    }

    renderChart() {
        if(this.props.stocks.length) {
            const margin = {left:50,right:0,top:50,bottom:50};
            const outerWidth = (window.innerWidth * 0.7515) * this.props.zoomLevel;
            const outerHeight = 300;
            const innerWidth = outerWidth-margin.right-margin.left;
            const innerHeight = outerHeight-margin.bottom-margin.top;
            const xColumn = "date";
            const yColumn = "close";
            const xAxisLabel = "Month";
            const xAxisLabelOffset = 25;
            const yAxisLabel = "Closing Price";
            const yAxisLabelOffset = 35;
            const color = d3.scaleOrdinal(d3.schemeCategory20);
            const stocks = this.props.stocks;
            const stockData = this.props.stockData;

            stockGraph = ReactFauxDOM.createElement('div');
            stockGraph.setAttribute("class", "stock-graph");

            let svg = d3.select(stockGraph).append('svg')
                        .attr('width',outerWidth)
                        .attr('height',outerHeight);
            let g = svg.append('g')
                    .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

            let xScale = d3.scaleTime().range([0,innerWidth]);
            let yScale = d3.scaleLinear().range([innerHeight,0]);

            let xAxisG = g.append("g")
                        .attr("transform","translate(0,"+innerHeight+")")
                        .attr("class", "x axis");
            let yAxisG = g.append("g")
                        .attr("class", "y axis");

            let xAxis = d3.axisBottom().scale(xScale);
            let yAxis = d3.axisLeft().scale(yScale);

            g.append("text")
                .style("text-anchor", "middle")
                .attr("x", innerWidth / 2)
                .attr("y", innerHeight + xAxisLabelOffset)
                .attr("class", "label")
                .text(xAxisLabel);

            g.append("text")
                .style("text-anchor", "middle")
                .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
                .attr("class", "label")
                .text(yAxisLabel);
            
            let line = d3.line()
                        .x(function(d){return xScale(new Date(d[xColumn]));})
                        .y(function(d){ return yScale(d[yColumn]);});

    
            let domainData = [];
            
            stocks.forEach(function(name){
                if(stockData[name]) {
                    stockData[name].forEach(function(d){
                        domainData.push(d);
                    });
                }
            });
            xScale.domain(d3.extent(domainData,function(d){
                return new Date(d[xColumn]);
            }));
            yScale.domain(d3.extent(domainData,function(d){
                return d[yColumn];
            }));
            xAxisG.call(xAxis);
            yAxisG.call(yAxis);
            stocks.forEach(function(stock, index){
                if(stockData[stock]) {
                    let path = g.append('path');
                    path.attr('d',line(stockData[stock]))
                        .style('stroke',color(index));
                }
            });
            return stockGraph.toReact();
        }   
    }

    render() {
        return (
            <div className="stock-graph-container">
                {this.renderChart()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        stockData: state.stocksInfo.data,
        stocks: state.stocksInfo.stocks,
        zoomLevel: state.zoom.zoomLevel
    }
}

export default connect(mapStateToProps, { getChartData })(Chart);