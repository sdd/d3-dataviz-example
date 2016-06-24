import React, { Component } from 'react';

import Header from './Header';
import { SplitButton, MenuItem } from 'react-bootstrap';

import TimelineChart from './TimelineChart';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = { data: {} };
    }

    async componentDidMount() {

        try {
            const response = await fetch('./data.json');
            const data = await response.json();

            this.setState({ ...this.state, data, error: undefined });
            console.log(data);

        } catch(e) {
            this.setState({ ...this.state, error: e });
            window.alert(`Error loading data (${e.message})`)
        }
    }

    selectStock(selectedStock) {
        this.setState({ ...this.state, selectedStock });
    }

    render() {

        const { selectedStock={},
            data: { stocks=[], data=[] }={}
        } = this.state;

        const transformedData = data

            // filter the data to only contain the selected stock
            .filter(entry => entry.stock === selectedStock.sym)

            // convert ISO date into unix timestamp for easier manipulation
            .map(entry => ({ ...entry, timestamp: new Date(entry.time).getTime() }));

        return <div className="container">
            <Header />

            <p>Stock</p>
            <SplitButton pullRight id="split-button-pull-right"
                title={selectedStock.name || 'Select Stock'}
                onSelect={stock => this.selectStock(stock)}
            >
                { stocks.map((stock, key) =>
                    <MenuItem key={key} eventKey={stock}>{stock.name} ({stock.sym})</MenuItem>
                )}
            </SplitButton>

            { selectedStock.sym && <TimelineChart data={transformedData} /> }

        </div>;
    }
}
