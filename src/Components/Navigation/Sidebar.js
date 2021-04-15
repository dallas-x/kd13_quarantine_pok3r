import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from 'react-perfect-scrollbar';

// reactstrap components
import { Nav, Collapse } from 'reactstrap';

//let ps;
const Sidebar = (props) => {
  const [state, setState] = useState();
  // const sidebarRef = useRef(null);

  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };

  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  useEffect(() => {
    setState(getCollapseStates(props.routes));
  }, []);

  // This breaks windows
  // useEffect(() => {
  //   // if you are using a Windows Machine, the scrollbars will have a Mac look
  //   if (navigator.platform.indexOf('Win') > -1) {
  //     ps = new PerfectScrollbar(sidebarRef.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false,
  //     });
  //   }
  //   return function cleanup() {
  //     // we need to destroy the false scrollbar when we navigate
  //     // to a page that doesn't have this component rendered
  //     if (navigator.platform.indexOf('Win') > -1) {
  //       ps.destroy();
  //     }
  //   };
  // });
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop['state']] = !state[prop.state];
        return (
          <li className={getCollapseInitialState(prop.views) ? 'active' : ''} key={key}>
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, ...st });
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">{prop.mini}</span>
                  <span className="sidebar-normal">
                    {prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={state[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className="" key={key}>
          <NavLink to={prop.layout + prop.path} activeClassName="" onClick={props.closeSidebar}>
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };

  const { activeColor, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a href={logo.outterLink} className="" onClick={props.closeSidebar}>
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a href={logo.outterLink} className="simple-text logo-normal" onClick={props.closeSidebar}>
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-large"
          onClick={props.closeSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </NavLink>
      );
      logoText = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.closeSidebar}
        >
          {logo.text}
        </NavLink>
      );
    }
  }
  return (
    <div className="sidebar" data={activeColor}>
      <div className="sidebar-wrapper">
        {logoImg !== null || logoText !== null ? (
          <div className="logo">
            {logoImg}
            {logoText}
          </div>
        ) : null}
        <Nav>{createLinks(props.routes)}</Nav>
      </div>
    </div>
  );
};

export default Sidebar;
