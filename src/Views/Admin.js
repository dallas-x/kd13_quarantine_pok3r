import React, { useState, useRef } from 'react';
import { auth } from '../firebase';
import Sidebar from '../Components/Sidebar.js';
import FixedPlugin from '../Components/plugin/FixedPlugin.js';
import NotificationAlert from 'react-notification-alert';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../routes.js';
import logo from 'url:../assets/logo/LogoMakr-81cC63.png';

const Admin = () => {
  const [activeColor, setActiveColor] = useState('blue');
  const [sidebarMini, setSidebarMini] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const mainPanelRef = useRef(null);
  const notificationAlertRef = useRef(null);

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

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleMiniClick = () => {
    let notifyMessage = 'Sidebar mini ';
    if (document.body.classList.contains('sidebar-mini')) {
      setSidebarMini(false);
      notifyMessage += 'deactivated...';
    } else {
      setSidebarMini(true);
      notifyMessage += 'activated...';
    }
    let options = {};
    options = {
      place: 'tr',
      message: notifyMessage,
      type: 'primary',
      icon: 'tim-icons icon-bell-55',
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
    document.body.classList.toggle('sidebar-mini');
  };
  const closeSidebar = () => {
    setSidebarOpened(false);
    document.documentElement.classList.remove('nav-open');
  };

  if (!auth.currentUser) {
    return <Redirect to="/login" />;
  }
  if (auth.currentUser)
    return (
      <div className="wrapper">
        <div className="rna-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <div className="navbar-minimize-fixed" style={{ opacity: opacity }}>
          <button className="minimize-sidebar btn btn-link btn-just-icon" onClick={handleMiniClick}>
            <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
            <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
          </button>
        </div>
        <Sidebar
          routes={routes}
          activeColor={activeColor}
          logo={{
            outterLink: '/admin',
            text: 'Admin Console',
            imgSrc: logo,
          }}
          closeSidebar={closeSidebar}
        />
        <div className="main-panel" ref={mainPanelRef} data={activeColor}>
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
        </div>
        <FixedPlugin
          activeColor={activeColor}
          sidebarMini={sidebarMini}
          handleActiveClick={handleActiveClick}
          handleMiniClick={handleMiniClick}
        />
      </div>
    );
};

export default Admin;
