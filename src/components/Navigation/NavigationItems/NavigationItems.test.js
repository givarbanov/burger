/* global expect, it, describe, beforeEach */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter});

describe('<NavigationItems />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should show two items if is not authentication', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should show three items if is authentication', () => {
        // wraper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should show logout item if is authentication', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link={'/logout'}>Logout</NavigationItem>)).toEqual(true);
    });
});