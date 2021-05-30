import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import Navi from './Components/Navi.js';
import Home from './Views/Home.js';
import Admin from './Views/Admin.js';
import Dashboard from './Views/Dashboard.js';
import HighRoller from './Views/HighRoller.js';
import Registration from './Views/Auth/Registration.js';
import Login from './Views/Auth/Login.js';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navi />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/high" component={HighRoller} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/registration" component={Registration} />
        </Switch>
        <Route path="/login" component={Login} />
      </UserProvider>
    </Router>
  );
};
render(<App />, document.getElementById('root'));
