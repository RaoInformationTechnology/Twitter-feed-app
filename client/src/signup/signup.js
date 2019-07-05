import React from 'react';
import TwitterLogin from 'react-twitter-auth/lib/react-twitter-auth-component.js';
import './signup.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import history from '../history';
import {config} from '../config'

const styles = theme => ({
	root: {
		flexGrow: 1,
	}
});

class SignUp extends React.Component {

	/** First Constructor Call */
	constructor(props) {
		console.log("props======", props);
		super(props);
		this.state = { isAuthenticated: false, user: null, token: '', fireRedirect: false };
	}

	/** If Fail Response Give Alert */
	onFailure = (error) => {
		alert(error);
	};

	/** Sucess Response Login Then Store Value In Localstorage  */
	twitterResponse = (response) => {
		if (response) {
			const token = response.headers.get('x-auth-token');
			response.json().then(user => {
				if (token) {
					this.setState({ isAuthenticated: true, user, token });
					console.log("msg==", this.state.user);
					localStorage.setItem('email', (this.state.user.email));
					localStorage.setItem('name', (this.state.user.name));
					localStorage.setItem('username', (this.state.user.username));
					localStorage.setItem('photo', (this.state.user.photo));
					localStorage.setItem('isAuthenticated', true);
					history.push('/home');
				}
			});
		}
		this.setState({ fireRedirect: true })
	};

	render() {
		const { classes } = this.props;
		/** User Authenticated */
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
										<TwitterLogin loginUrl={config.baseApiUrl+"api/v1/auth/twitter"}
											onFailure={this.onFailure} onSuccess={this.twitterResponse}
											requestTokenUrl={config.baseApiUrl+"api/v1/auth/twitter/reverse"} />
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
