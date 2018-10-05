import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from '../Checkout/ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    // constructor (props) {
    //     super(props);
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let prop of query) {
    //         if (prop[0] === 'price') {
    //             price = prop[1];
    //         } else {
    //             ingredients[prop[0]] = +prop[1];
    //         }
    //     }
    //     this.state = { ingredients: ingredients, totalPrice: price };
    // }

    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     let ingredients = {};
    //     let price = 0;
    //     for (let prop of query) {
    //         if (prop[0] === 'price') {
    //             price = prop[1];
    //         } else {
    //             ingredients[prop[0]] = +prop[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancel={this.checkoutCancel}
                        checkoutContinue={this.checkoutContinue} />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
        price: state.burgerBuilder.totalPrice
    };
};


export default connect(mapStateToProps)(Checkout);