import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid} from '../utils/Form/formActions';

class Login extends Component {
    
    //state for form and password in the login form
    
    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }

     }

    //submitting the form 

    submitForm = (event) => {
        event.preventDefault();
        //convert the data form 
        let dataToSubmit = generateData(this.state.formdata, 'login');
        //checking if the form is vaild before submitting
        let formIsValid = isFormValid(this.state.formdata, 'login');
   
        if(formIsValid){
            console.log(dataToSubmit)
        }else{
            this.setState({
                formError: true
            })
        }
      
    }

    //update the form 
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

                    {/* if the formError is false, will display error message  */}
                    { this.state.formError ?
                        <div className="error_label">
                            Please check your data
                        </div>
                    :null}
                    <button onClick={(event) => this.submitForm(event)}>
                        LOG IN
                    </button>

                </form>
            </div>

         );
    }
}
 
export default connect()(Login);