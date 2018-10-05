import React, { Component } from 'react';

import Aux from '../../../hoc/Aux1/Aux';
import Button from '../../UI/Button/Button';

import { NavLink } from 'react-router-dom';

class OrderSummary extends Component {

    componentWillUpdate = () => {
        console.log('[OrderSummary] will update');
    }
    
    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(idIngr => {
            return (
                <li key={idIngr}>
                    <span style={{textTransform: 'capitalize'}}>{idIngr}</span> : {this.props.ingredients[idIngr]}
                </li>
            )
        })    

        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType='Danger' clicked={this.props.cancelPurchasing}>CANCEL</Button>
            <Button btnType='Success' clicked={this.props.continuePurchasing}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;