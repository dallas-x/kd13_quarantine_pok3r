import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';

// reactstrap components
import { Nav, Collapse } from 'reactstrap';

const Sidebar = (props) => {
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
