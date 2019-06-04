import React from 'react';

import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import CreateForm from './createform';
import List from './list';


class Header extends React.Component {
  render() {
    return (
      <Router>
      <div>        
      <div>
      <ul>
       <li>
      <Link to="/createform">CreateForm</Link>
      </li>
      <li>
       <Link to="/list">List</Link>
      </li>
      </ul>
      </div>
     
      <Route exact path="/createform" component={CreateForm} />
      <Route exact path="/list" component={List} />
      </div>
      </Router>
      )
  }
}