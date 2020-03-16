import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update} from '../utils/Form/formActions';

class Login extends Component {
    
    //state for form and password in the login form
    state = { 
        formError: false,
        formSucess: '',
        formdata: {
            email:{
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placehodler: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password:{
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placehodler: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }

     }

    submitForm = () => {

    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    render() { 
        return ( 
            <div className="signin_wrapper">
                <form onSubmit={(event)=> this.submitForm(event)}>

                    <FormField 
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                        
                    />

                    <FormField 
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                        
                    />



                </form>
            </div>

         );
    }
}
 
export default connect()(Login);