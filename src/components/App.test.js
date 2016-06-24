import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import App from './App';

describe('App component', () => {

    it('renders correctly', () => {

        const comp = TestUtils.renderIntoDocument(<App />);
        expect(comp).to.exist;
    });
});
