import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from './service';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    /** first call this function during app run */
    componentDidMount() {

      /** Get token from localstorage & pass token in header */
      const Token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...',
        'token': Token
      }

      /** 
       * @param {string} token
       * user get token and check token 
       * */
      if (Token) {
        API.authenticate()
          .then(res => {
            if (res.status === 200) {
              this.setState({ loading: false });
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            this.setState({ loading: false, redirect: true });
          });
      } else {
        alert('no token provided');
        this.setState({ loading: false, redirect: true });
      }
    }

    /** Render app using token */
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }

      /** Token not get then redirect in signup page */
      if (redirect) {
        return <Redirect to="/signup" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}