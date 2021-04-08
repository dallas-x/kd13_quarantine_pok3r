import React from 'react';

import { Button, CustomInput } from 'reactstrap';

const FixedPlugin = (props) => {
  const [classes, setClasses] = React.useState('dropdown');
  const [darkMode, setDarkMode] = React.useState(false);
  const handleClick = () => {
    if (classes === 'dropdown') {
      setClasses('dropdown show');
    } else {
      setClasses('dropdown');
    }
  };
  const handleActiveMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('white-content');
  };
  return (
    <div className="fixed-plugin">
      <div className={classes}>
        <a
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <i className="fa fa-cog fa-2x" />
        </a>
        <ul className="dropdown-menu show">
          <li className="header-title">Accent Color</li>
          <li className="adjustments-line">
            <div className="badge-colors text-center">
              <span
                className={
                  props.activeColor === 'primary'
                    ? 'badge filter badge-primary active'
                    : 'badge filter badge-primary'
                }
                data-color="primary"
                onClick={() => {
                  props.handleActiveClick('primary');
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') props.handleActiveClick('primary');
                }}
                role="button"
                tabIndex={-1}
              />
              <span
                className={
                  props.activeColor === 'blue'
                    ? 'badge filter badge-info active'
                    : 'badge filter badge-info'
                }
                data-color="info"
                onClick={() => {
                  props.handleActiveClick('blue');
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') props.handleActiveClick('primary');
                }}
                role="button"
                tabIndex={-2}
              />
              <span
                className={
                  props.activeColor === 'green'
                    ? 'badge filter badge-success active'
                    : 'badge filter badge-success'
                }
                data-color="success"
                onClick={() => {
                  props.handleActiveClick('green');
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') props.handleActiveClick('primary');
                }}
                role="button"
                tabIndex={-3}
              />
              <span
                className={
                  props.activeColor === 'orange'
                    ? 'badge filter badge-warning active'
                    : 'badge filter badge-warning'
                }
                data-color="warning"
                onClick={() => {
                  props.handleActiveClick('orange');
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') props.handleActiveClick('primary');
                }}
                role="button"
                tabIndex={-4}
              />
              <span
                className={
                  props.activeColor === 'red'
                    ? 'badge filter badge-danger active'
                    : 'badge filter badge-danger'
                }
                data-color="danger"
                onClick={() => {
                  props.handleActiveClick('red');
                }}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') props.handleActiveClick('primary');
                }}
                role="button"
                tabIndex={-5}
              />
            </div>
          </li>
          <li className="header-title">Features</li>
          <li className="adjustments-line">
            <div className="togglebutton switch-sidebar-mini d-flex align-items-center justify-content-center">
              <span className="label-switch">LARGE</span>
              <CustomInput
                type="switch"
                id="switch-1"
                onChange={props.handleMiniClick}
                value={props.sidebarMini}
                className="mt-n4"
              />
              <span className="label-switch ml-n3">MINI</span>
            </div>
          </li>
          <li className="adjustments-line">
            <div className="togglebutton switch-change-color mt-3 d-flex align-items-center justify-content-center">
              <span className="label-switch">LIGHT MODE</span>
              <CustomInput
                type="switch"
                id="switch-2"
                onChange={handleActiveMode}
                value={darkMode}
                className="mt-n4"
              />
              <span className="label-switch ml-n3">DARK MODE</span>
            </div>
          </li>
          <li className="button-container">
            <Button href="https://support.sheldyn.io" color="warning" block className="btn-round">
              <i className="tim-icons icon-alert-circle-exc" />
              Have an issue?
            </Button>
          </li>
          <li className="button-container">
            <Button
              color="default"
              block
              className="btn-round"
              href="https://github.com/k1ddarkn3ss/kd13_quarantine_pok3r"
              target="_blank"
            >
              <i className="tim-icons icon-paper" /> Documentation
            </Button>
          </li>
          <li className="button-container">
            <Button href="" color="info" block className="btn-round">
              Premium Subscription
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FixedPlugin;
