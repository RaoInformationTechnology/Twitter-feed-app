import React from 'react';
import SignUp from './signup/signup.js';
import Home from './home/home.js';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = localStorage.getItem('email');
	}
	render() {
		if (!this.state) {
			return (
				<div>
					<SignUp />
				</div>
			);
		} else {
			return (
				<div>
					<Home />
				</div>
			);
		}
	}
}

export default App;
