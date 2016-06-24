import React, { Component } from 'react';

export default class Test extends Component {

    render() {
        fetch(); // check that fetch exists in global context
        return <div className="Test">Testy McTest</div>;
    }
}
