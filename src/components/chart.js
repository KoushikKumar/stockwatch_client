import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import { connect } from 'react-redux';

import { getChartData, renderHoveredData } from '../actions';
import { HOVERED_DATA } from '../actions/types';

const colorsArray = ["1676b6", "adc6ea", "ff7f00", "ffbb72", "24a122", 
                "96e086", "d8241f", "ff9794", "9564bf", "c5afd6",
                "8d564a", "c59c93", "e574c3", "f9b5d2", "7f7f7f",
                "c7c7c7", "bcbe00", "dbdc88", "00bed0", "9cdae6"];
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

            let stockGraph = ReactFauxDOM.createElement('div');
            stockGraph.setAttribute("class", "stock-graph");

            let hoveredDataDiv = d3.select('.stock-graph-container').append('div').attr("class", "hovered-data");

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

            let rectData = [];
            let xScaleDomain = xScale.domain();
            let noOfDays = (xScaleDomain[1] - xScaleDomain[0]) / (1000 * 60 * 60 * 24);

            for (let i = 0; i <= noOfDays; i++) {
                rectData.push(i);
            }

            let bar_width = innerWidth / rectData.length;
            var bars = g.selectAll('rect').data(rectData);
            bars.enter().append('rect');
            var allBars = g.selectAll('rect');
            allBars.attr("x", function(d) {
                return d * bar_width
            })
            .attr("y", function(d) {
                return 0
            })
            .attr("width", bar_width)
            .attr("height", function(d) {
                return innerHeight - 0
            })
            .attr("class", "bars");
            bars.exit().remove();

            allBars.on('mouseover', function(d) {
                function getDate(d) {
                    let date = new Date();
                    date.setDate(date.getDate() - (365 - d));
                    return date.getFullYear() + "-" + (appendZero(Number(date.getMonth()) + 1)) + "-" + appendZero(date.getDate());
                }

                function appendZero(num) {
                    if (num < 10) {
                        return "0" + num;
                    }
                    return num;
                }

                function getClosingPrice(date, data) {
                    let result = "";
                    if(data && data.length){
                        data.every((dataPoint) => {
                            if (dataPoint["date"].startsWith(date)) {
                                result = dataPoint["close"];
                                return false;
                            }
                            return true;
                        });
                    }
                    if(!result) {
                        return "Sat/Sun/NA";
                    }
                    return result.toFixed(2);
                }

                let hoveredDate = getDate(d);
                let hoveredData = "";
                stocks.forEach(function(stock, index) {
                    hoveredData = hoveredData +" "+ "<div class='hovered-span' style='background-color:"+"#"+colorsArray[index]+"'></div>" +" "+ stock + " " + getClosingPrice(hoveredDate, stockData[stock]);
                });
                hoveredDataDiv.html(hoveredDate + "   " + hoveredData);
            });

            allBars.on('mouseout', function(d) {
                hoveredDataDiv.html('');
            });

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
