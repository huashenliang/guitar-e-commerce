import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Components/Home';
import Layout from './hoc/layout';

//Routes-----------------------------
import RegisterLogin from './Components/Register_login';
import Register from './Components/Register_login/register';
import UserDashBoard from './Components/User';
import Auth from './hoc/auth';
import Shop from './Components/Shop';


const Routes = () => {
    return(
        <Layout>
            <Switch>
                {/* true for complete private route, false for in between, null for public  */}
                <Route path="/user/dashboard" exact component={Auth(UserDashBoard, true)} />
                
                <Route path="/register" exact component={Auth(Register, false)} />
                <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />

                <Route path="/" exact component={Auth(Home, null)} />
                <Route path="/shop" exact component={Auth(Shop, null)} />
            </Switch>
        </Layout>
        
    )
} 
 
export default Routes;