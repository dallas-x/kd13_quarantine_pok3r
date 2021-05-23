import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserProvider from './providers/UserProvider';
import Navi from './Components/navigation/Navi';
import Home from './views/Home';
import Admin from './views/Admin';
import Dashboard from './views/Dashboard';
import HighRoller from './views/HighRoller';
import Registration from './views/Auth/Registration';
import Login from './views/Auth/Login';

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
