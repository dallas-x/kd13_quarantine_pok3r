// // This is for them regular folks
// import React from 'react';
// import { Container } from 'reactstrap';

// const HighRoller = () => {
//   return (
//     <div className="index-page">
//       <div className="wrapper">
//         <div className="page-header header-filter">
//           <div className="squares square1" />
//           <div className="squares square2" />
//           <div className="squares square3" />
//           <div className="squares square4" />
//           <div className="squares square5" />
//           <div className="squares square6" />
//           <div className="squares square7" />
//           <Container>
//             <div className="content-center brand">
//               <h1 className="h1-seo">Wins, and Losses</h1>
//               <h3 className="d-none d-sm-block">Gamble Responsibly</h3>
//               <p>
//                 {' '}
//                 With custom dashboards, alerts, and a community. We can not only show your poker
//                 face, we can help you know your limit, and prevent gambling addictions.
//               </p>
//             </div>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HighRoller;

import React, { useState, useRef } from 'react';
import Sidebar from '../Components/navigation/Sidebar';
import FixedPlugin from '../Components/plugin/FixedPlugin';
import NotificationAlert from 'react-notification-alert';
import { Redirect, Route, useLocation, Switch } from 'react-router-dom';
import routes from '../dashboard.routes';
import logo from 'url:../assets/logo/LogoMakr-81cC63.png';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
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
      if (route.layout === '/dashboard') {
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
          imgSrc: logo,
        }}
        closeSidebar={closeSidebar}
      />
      <div className="main-panel" ref={mainPanelRef} data={activeColor}>
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard/dashboard" />
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

export default Dashboard;
