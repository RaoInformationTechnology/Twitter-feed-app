import React from 'react';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import VueAxios from 'vue-axios';
import axios from 'axios';
import { Redirect } from 'react-router';
import { createBrowserHistory } from 'history';

import './signup.css';
import Home from '../home/home.js';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
	root: {
		flexGrow: 1,
	}
});



class SignUp extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isAuthenticated: false, user: null, token:'',fireRedirect: false};

	}

	
	onFailure = (error) => {
		alert(error);
	};

	twitterResponse = (response) => {
		if(response){
			console.log("msg===========");
			console.log("response==============",response);
			const token = response.headers.get('x-auth-token');
			response.json().then(user => {
				if (token) {
					this.setState({isAuthenticated: true, user, token});
					console.log("msg==",this.state.user);
					localStorage.setItem('email', (this.state.user.email));
					localStorage.setItem('name', (this.state.user.name));
					localStorage.setItem('username', (this.state.user.username));
					localStorage.setItem('photo',(this.state.user.photo));
					localStorage.setItem('isAuthenticated', true);
				}
			});

			
		}
		this.setState({ fireRedirect: true })
	};

	
	render() {

		

		if(this.state.isAuthenticated && this.state.fireRedirect) {

			window.location.href = '/home'
		}else{
			console.log("error");
		}

		const { classes } = this.props;


		return (
			<div>
			<div className={classes.root}>
			<Grid container spacing={12}>

			<Grid item xs={6} md={6}>
			<div className="twitter-signup">
			<h3><i className="fas fa-search"></i> Search Tweets</h3>
			<h3><i className="fas fa-address-card"></i>  Twitter-trends</h3>
			<h3><i className="fas fa-hashtag"></i>  Add-Hashtag</h3>
			</div>
			</Grid>
			<Grid item xs={6} md={6}>

			<div className="signup_bg">
			<div>
			<div>
			</div>
			<div>
			<TwitterLogin loginUrl="http://132.140.160.62:4000/api/v1/auth/twitter"
			onFailure={this.onFailure} onSuccess={this.twitterResponse}
			requestTokenUrl="http://132.140.160.62:4000/api/v1/auth/twitter/reverse"/>
			</div>

			</div>
			</div>

			</Grid>

			</Grid>
			</div>

			</div>

			);




		}
	}

	export default withStyles(styles)(SignUp);
