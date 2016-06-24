import { expect } from 'chai';

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Test from './Test';

describe('Test component', () => {

    it('renders correctly', () => {

        const comp = TestUtils.renderIntoDocument(<Test />);

        // check that the component renders
        expect(comp).to.exist;

        const elem = TestUtils.findRenderedDOMComponentWithClass(comp, 'Test');

        // check that jsdom is working in the test env
        expect(elem.textContent).to.equal('Testy McTest');
    });
});
