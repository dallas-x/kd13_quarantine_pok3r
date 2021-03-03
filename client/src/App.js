import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Navi from './components/Navi';
import Home from './Views/Home';
import Admin from './Views/Admin';
import Registration from './Views/Registration';
import Login from './Views/Login';

const yourOktaDomain = 'dev-1007272.okta';
const clientId = '0oaadsjrcAujXPmsZ5d6';
const oktaAuth = new OktaAuth({
  issuer: `https://${yourOktaDomain}.com/oauth2/default`,
  clientId: clientId,
  redirectUri: window.location.origin + '/Login',
});

const App = () => {
  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        <Navi />
        <Route path="/" exact component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
      </Security>
    </Router>
  );
};
render(<App />, document.getElementById('root'));
