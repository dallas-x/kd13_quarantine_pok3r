import React, { useState, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Sidebar from '../Components/Navigation/Sidebar';
import { Container } from 'reactstrap';
import { Redirect, Route, useLocation, Switch } from 'react-router-dom';
import routes from '../routes';
import logo from 'url:../assets/logo/FB1.jpg';

const Admin = () => {
  const { authState } = useOktaAuth();
  const [activeColor, setActiveColor] = useState('blue');
  const [sidebarMini, setSidebarMini] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const mainPanelRef = useRef(null);
  const notificationAlertRef = useRef(null);
  const location = useLocation();

  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.collapse) {
        return getRoutes(route.views);
      }
      if (route.layout === '/admin') {
        return <Route path={route.layout + route.path} component={route.component} key={key} />;
      } else {
        return null;
      }
    });
  };

  if (authState.isPending) {
    return (
      <div className="profile-page">
        <div className="wrapper">
          <section className="section">
            <Container>Loading...</Container>
          </section>
        </div>
      </div>
    );
  }
  if (!authState.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  if (authState.isAuthenticated)
    return (
      <div className="wrapper">
        <Sidebar
          routes={routes}
          activeColor={activeColor}
          logo={{
            outterLink: '/admin',
            text: 'Admin Console',
            imgSrc: logo,
          }}
        />
        <div className="main-panel" ref={mainPanelRef} data={activeColor}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    );
};

export default Admin;
