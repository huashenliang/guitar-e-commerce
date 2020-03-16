import React from 'react';
import {Link} from 'react-router-dom';

const links = [
    {
        name:  'My account',
        linkTo:'/user/dashboard'
    },
    {
        name:  'User information',
        linkTo:'/user/user_profile'
    },
    {
        name:  'My Cart',
        linkTo:'/user/cart'
    },
]



const UserLayout = (props) => {

    return ( 
        <div className="container">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2> My Account</h2>
                    <div className="links">
                        { links.map((item, i) => (
                            <Link to={item.linkTo} key={i}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="user_right_nav">
                    {props.children}
                </div>
            </div>
        </div>
     );
}
 
export default UserLayout;