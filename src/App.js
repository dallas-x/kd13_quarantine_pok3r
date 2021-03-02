import React, { useState } from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import Home from './Views/Home';
import Admin from './Views/Admin';

import Navi from './components/Navi';

const App = () => {
  const themeHook = useState('crimson');
  return (
    <React.StrictMode>
      <div>
        <Navi />
        <Router>
          <Home path="/" />
          <Admin path="/admin" />
        </Router>
      </div>
    </React.StrictMode>
  );
};
render(<App />, document.getElementById('root'));
