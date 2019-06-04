import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import SignUp from './signup/signup.js';
import Home from './home/home.js';
import App from './App';
import './index.css';


ReactDOM.render(
	<div>
	<Router>
	<Route exact path='/' component={App} />
	<Route  path="/signup" component={SignUp} />
	<Route  path="/home" render={() =>(
          localStorage.getItem('email') ? ( <Route  component={Home} />)
          : (<Route component={SignUp} />)
        )} />
	</Router>
	</div>,
	document.getElementById('root')
	
	);
