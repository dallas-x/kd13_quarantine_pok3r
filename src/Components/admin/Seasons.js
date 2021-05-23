import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

const Seasons = () => {
  const [seasons, setSeasons] = useState([{ Week: 'No week found', TPP: 0, _id: 0 }]);

  const notificationAlertRef = useRef(null);
  const woopsx = () => {
    let options = {};
    options = {
      place: 'tr',
      message:
        'You can not create a new season. This is automatically created when you upload data!',
      type: 'info',
      icon: 'tim-icons icon-alert-circle-exc',
      autoDismiss: 15,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const woopsy = () => {
    let options = {};
    options = {
      place: 'tr',
      message: 'You do not have permissions to delete data!',
      type: 'danger',
      icon: 'tim-icons icon-alert-circle-exc',
      autoDismiss: 15,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  const resetSeason = () => {
    // Call firebase do something
  };
  return (
    <div className="content">
      <NotificationAlert ref={notificationAlertRef} />
      <Row>
        <div className="btn-wrapper">
          <Button onClick={woopsx} className="btn-simple" color="success">
            <i className="tim-icons icon-tap-02" /> New Season
          </Button>
          <Button onClick={resetSeason} className="btn-simple" color="warning">
            <i className="tim-icons icon-refresh-01" /> Reset Season
          </Button>
          <Button onClick={woopsy} className="btn-simple" color="danger">
            <i className="tim-icons icon-trash-simple" /> Delete Season
          </Button>
        </div>
      </Row>
      <br />
      <Row>
        <div className="card">
          <h3 className="card-title">Current Bob Season</h3>

          <div className="card-body">
            <div className="blockquote blockquote-primary">
              <p className="blockquote blockquote">
                {`Season: ${seasons[0]._id}` || 'no data found'}
              </p>
              <p className="blockquote blockquote">
                {`Week: ${seasons[0].Week}` || 'no data found'}
              </p>
              <p className="blockquote blockquote">
                {`Total Possible Points: ${seasons[0].TPP}` || 'no data found'}
              </p>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Seasons;
