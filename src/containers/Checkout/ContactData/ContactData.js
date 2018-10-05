import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orders from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {

                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'cheapest',
                validation: {},
                valid: true

            }
        },
        isFormValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const orderForm = {};
        for (let orderFormElementKey in this.state.orderForm) {
            orderForm[orderFormElementKey] = this.state.orderForm[orderFormElementKey].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: orderForm
        };

        this.props.onOrder(order);
        // axios.post('orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //     });
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHangler = (event, elementIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormEl = {
            ...updatedOrderForm[elementIdentifier]
        };
        updatedFormEl.value = event.target.value;
        updatedFormEl.valid = this.checkValidity(event.target.value, updatedOrderForm[elementIdentifier].validation);
        updatedFormEl.touched = true;
        updatedOrderForm[elementIdentifier] = updatedFormEl;

        let isFormValid = true;
        for (let forElemetIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[forElemetIdentifier].valid && isFormValid;
        }

        this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        valid={formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHangler(event, formElement.id)} />
                ))}
                <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = (<Spinner />);
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contakt Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (orderData) => dispatch(orders.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));