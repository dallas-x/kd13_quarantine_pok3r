import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import { auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';

const Navi = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOut, setCollapseOut] = useState('');
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [sidebarMini, setSidebarMini] = useState(false);
  const [color, setColor] = useState('navbar-transparent');
  const user = useContext(UserContext);
  const history = useHistory();

  const logout = () => {
    auth.signOut();
    history.replace('/login');
  };

  const changeColor = () => {
    if (document.documentElement.scrollTop > 99 || document.body.scrollTop > 99) {
      setColor('bg-info');
    } else if (document.documentElement.scrollTop < 100 || document.body.scrollTop < 100) {
      setColor('navbar-transparent');
    }
  };
  const handleMiniClick = () => {
    if (document.body.classList.contains('sidebar-mini')) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle('sidebar-mini');
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle('nav-open');
    setCollapseOpen(!collapseOpen);
  };
  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
    document.documentElement.classList.toggle('nav-open');
  };
  const onCollapseExiting = () => {
    setCollapseOut('collapsing-out');
  };
  const onCollapseExited = () => {
    setCollapseOut('');
  };

  useEffect(() => {
    window.addEventListener('scroll', changeColor);
    return function cleanup() {
      window.removeEventListener('scroll', changeColor);
    };
  }, []);
  return (
    <Navbar className={'fixed-top ' + color} color-on-scroll="100" expand="lg">
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-minimize d-inline">
            <Button
              className="minimize-sidebar btn-just-icon"
              color="link"
              id="tooltip209599"
              onClick={handleMiniClick}
            >
              <i className="tim-icons icon-align-center visible-on-sidebar-regular" />
              <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
            </Button>
            <UncontrolledTooltip delay={0} target="tooltip209599" placement="right">
              Sidebar toggle
            </UncontrolledTooltip>
          </div>
          <div
            className={classNames('navbar-toggle d-inline', {
              toggled: sidebarOpened,
            })}
          >
            <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>kd13 • </span>
            experiment9
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed and Coded by K1d Darkn3ss
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={'justify-content-end ' + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#dallas" onClick={(e) => e.preventDefault()}>
                  KD13•Poker
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem>
              <Button
                className="nav-link d-none d-lg-block"
                color="primary"
                tag={Link}
                to="/dashboard"
              >
                <i className="tim-icons icon-chart-bar-32" /> Dashboard
              </Button>
            </NavItem>
            <NavItem>
              <Button className="nav-link d-none d-lg-block" color="success" tag={Link} to="/admin">
                <i className="tim-icons icon-components" /> Console
              </Button>
            </NavItem>
            <NavItem>
              {user ? (
                <Button onClick={logout} className="btn-link">
                  Logout
                </Button>
              ) : (
                <NavLink tag={Link} to="/login">
                  <i className="tim-icons icon-badge" />
                  Login
                </NavLink>
              )}
            </NavItem>
            <NavItem>
              {user ? (
                <NavLink tag={Link} to="/profile">
                  {user.displayName ? user.displayName : user.email}
                </NavLink>
              ) : (
                <NavLink tag={Link} to="/registration">
                  Register
                </NavLink>
              )}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
