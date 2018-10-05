import React, { Component } from 'react';

import Aux from '../Aux1/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        // constructor(props) {
        //     super(props);
        //     this.state = {error: null};
        //     this.reqInterceptor = axios.interceptors.request.use(req => {
        //         this.sate = {error: null};
        //         return req;
        //     });
        
        //     this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        //         this.state = {error: error};
        //     });
        //     console.log("[ERROR HAND constr] " + this.state.error)
        // }

        state = {
            error: null
        }
    
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
        
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            })    
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render() {
            console.log("[ERROR:] " + this.state.error);
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        closeModal={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;