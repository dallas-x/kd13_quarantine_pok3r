import React, { useRef } from 'react';
import Uploader from './Components/Uploader';
import NotificationAlert from 'react-notification-alert';

const Tournaments = () => {
  const notificationAlertRef = useRef(null);
  const alertSuccess = (options) => {
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <div className="content">
      <div className="">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <div className="card">
        <div className="card-body">
          <h3>More options are coming soon!</h3>
          <ul>
            <li>Select type of game during upload</li>
            <li>Configure email for auto game update!</li>
          </ul>
        </div>
        <Uploader alertSuccess={alertSuccess} />
      </div>
    </div>
  );
};

export default Tournaments;
