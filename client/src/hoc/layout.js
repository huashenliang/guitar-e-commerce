import React, { Component } from 'react';
import Footer from '../Components/Header_footer/Footer';
import Header from '../Components/Header_footer/Header'


class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="page_container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Layout;