/* global expect, it, describe */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter});

describe('<NavigationItems />', () => {
    it('should show two items if is authentication', () => {
        const wraper = shallow(<NavigationItems />);
        expect(wraper.find(NavigationItem)).toHaveLength(2);
    });
});