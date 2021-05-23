import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProvider from './Providers/UserProvider';
import Navi from './Components/Navigation/Navi';
import Home from './Views/Home';
import Admin from './Views/Admin';
import Dashboard from './Views/Dashboard';
import HighRoller from './Views/HighRoller';
import Registration from './Views/Auth/Registration';
import Login from './Views/Auth/Login';

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
