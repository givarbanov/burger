import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './components/Auth/Logout/Logout';
import * as actions from '../src/store/actions/index';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./components/Auth/Auth');
});

class App extends Component {

    componentDidMount () {
        this.props.onAutoAuthorise();
    }

    render() {

        let routs = (
            <Switch>
                <Route path='/auth' component={asyncAuth}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routs = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/order' component={asyncOrders}/>
                    <Route path='/auth' component={asyncAuth}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' exact component={BurgerBuilder}/>
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routs}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAutoAuthorise: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
