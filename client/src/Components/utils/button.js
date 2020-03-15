import React from 'react';
import {Link} from 'react-router-dom';

const MyButton = (props) => {
    
    const buttons = () => {
        let template = ''
        
        console.log(props)
        switch(props.type) {
            case "default":
                template= <Link
                    className="link_defualt"
                    to={props.linkTo}
                    {...props.addStyles}
                > {props.title} </Link>
            
            break;
            default: 
                template=''
        }

        return template
    }
    
    return ( 
        <div className="my_link">
            {buttons()}
        </div>

     );
}
 
export default MyButton;