import React, { Component } from 'react';
import moment from 'moment';
import RangeSlider from 'rc-slider';

import TimelineChartOverview from './TimelineChartOverview';
import TimelineChartZoom from './TimelineChartZoom';

const humanizeTimestamp = ts => moment(ts).format('DD/MM/YY hh:mm:ss');

export default class TimelineChart extends Component {

    constructor(props) {
        super(props);

        const { data=[] } = this.props;

        this.state = {
            zoomRange: [
                data.length ? data[0].timestamp : 0,
                data.length ? data[data.length - 1].timestamp : 1
            ]
        }
    }

    onSliderChange(zoomRange) {
        this.setState({ ...this.state, zoomRange });
    }

    render() {

        const { data=[] } = this.props;
        const { zoomRange: [ zoomStart, zoomEnd] } = this.state;

        const fullRange = data.length ? [
            data[0].timestamp,
            data[data.length - 1].timestamp
        ] : [ 0, 1 ];

        const zoomData = data
            .filter(entry => entry.timestamp >= zoomStart && entry.timestamp <= zoomEnd);

        return <div className="TimelineChart">

            <TimelineChartZoom data={zoomData} />
            <TimelineChartOverview data={data} />
            <RangeSlider range
                tipFormatter={humanizeTimestamp}
                min={fullRange[0]}
                max={fullRange[1]}
                defaultValue={fullRange}
                onChange={this.onSliderChange.bind(this)}
            />
        </div>;
    }
}
