import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';


 //composed component
export default function(ComposedClass, reload, adminRoute = null){   
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount() {
      
            this.props.dispatch(auth()).then(response => {
                let user = this.props.user.userData;
                
                
                if(!user.isAuth){
                    //user is not authenticated
                    if(reload){
                        //load back to login page
                        this.props.history.push('/register_login')
                    }
                }else{
                    //authenticated!
                    
                    //if the user is not an admin, load to user dashboard
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard')
                    }else{
                        //if user is authenticated, load to user dashboard
                        if(reload === false){
                            this.props.history.push('/user/dashboard')
                        }
                    }


                }


                this.setState({loading:false})
            })
        }

        render() { 
            //checking first before loading the component
            if(this.state.loading){
                return(
                    <div className="main_loader">
                        <CircularProgress style={{color:'#2196F3'}} thickness={7}/>
                    </div>
                )
            }
            return ( 
               <ComposedClass {...this.props} user={this.props.user}/>
            );
        }
    }
    
    function mapstateToProps(state){
        return{
            user: state.user
        }
    }

    return connect(mapstateToProps)(AuthenticationCheck)
}

