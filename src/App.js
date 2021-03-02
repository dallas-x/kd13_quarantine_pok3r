import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import Home from './Views/Home';
import Admin from './Views/Admin';
import Registration from './Views/Registration';
import Login from './Views/Login';

import Navi from './components/Navi';

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <Navi />
        <Router>
          <Home path="/" />
          <Admin path="/admin" />
          <Registration path="/registration" />
          <Login path="/login" />
        </Router>
      </div>
    </React.StrictMode>
  );
};
render(<App />, document.getElementById('root'));
