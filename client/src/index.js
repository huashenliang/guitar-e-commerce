import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Resources/css/style.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
,document.getElementById('root'));
