import React, { Component } from 'react';
import d3 from 'd3';
import ReactFauxDOM from 'react-faux-dom';
import Dimensions from 'react-dimensions'

export class TimelineChartOverview extends Component {

    render() {

        const { data, containerWidth } = this.props;
        const height = 50;

        const x = d3.time.scale().range([0, containerWidth]);
        const y = d3.scale.linear().range([height, 0]);

        const xAxis = d3.svg.axis().scale(x).orient('bottom');

        const line = d3.svg.line()
        .x(d => x(d.timestamp))
        .y(d => y(d.price));

        const node = ReactFauxDOM.createElement('svg');
        const svg = d3.select(node)
            .attr('width', containerWidth)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(0, 0)');


        x.domain(d3.extent(data, d => d.timestamp));
        y.domain(d3.extent(data, d => d.price));

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${height})`)
            .call(xAxis);

        svg.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', line);

        return <div className="TimelineChart_Overview">
            { node.toReact() }
        </div>;
    }
}

// Dimensions HOC wraps our class in order to inject the containerWidth prop
export default Dimensions()(TimelineChartOverview);
