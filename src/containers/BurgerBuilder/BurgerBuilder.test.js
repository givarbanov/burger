/* global expect, it, describe, beforeEach */

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilde } from './BurgerBuilder';
import BuildContrils from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter});

describe('<BurgerBuilde />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilde onInitIngredient={() => {}} />);
    });

    it('should render BuildControls when ingredients receiving', () => {
        wrapper.setProps({ings: {salad: 2}});
        expect(wrapper.find(BuildContrils)).toHaveLength(1);
    });
});
