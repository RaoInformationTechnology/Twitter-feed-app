import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route } from "react-router-dom";
import SignUp from './signup/signup.js';
import Home from './home/home.js';
import App from './App';
import './index.css';
import history from './history';


ReactDOM.render(
	/** Path & Routing */
	<div>
		<HashRouter history={history}>
			<Route exact path='/' component={App} />
			<Route path="/signup" component={SignUp} />
			<Route path="/home" render={() => (
				localStorage.getItem('email') ? (<Route component={Home} />)
					: (<Route component={SignUp} />)
			)} />
		</HashRouter>
	</div>,
	document.getElementById('root')
);
