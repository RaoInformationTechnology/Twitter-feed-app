import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route } from "react-router-dom";
import SignUp from './signup/signup.js';
import Home from './home/home.js';
import App from './App';
import './index.css';
import history from './history';


ReactDOM.render(
	/** Path & Routing */
	<Router history={history}>
		<Route exact path='/' component={App} />
		<Route path="/signup" component={SignUp} />
		<Route path="/home" render={() => (
			localStorage.getItem('email') ? (<Route component={Home} />)
				: (<Route component={SignUp} />)
		)} />
	</Router>,
	document.getElementById('root')
);
