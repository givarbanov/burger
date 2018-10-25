import React, { Component } from 'react';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as classes  from './Auth.css';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };   

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
    };

    inputChangedHangler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        
        this.setState({ controls: updatedControls});
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchSubmitModeHandler = (event) => {
        event.preventDefault();
        this.setState({isSignup: !this.state.isSignup});
    }

    render () {

        let formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let formElems = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHangler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            formElems = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {formElems}
                    <Button btnType="Success">{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
                </form>
                <Button
                    clicked={this.switchSubmitModeHandler} 
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);