import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import UnderConstruction from './Components/UnderConstruction';
import { Button, Row, Col, Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

const Seasons = () => {
  const [seasons, setSeasons] = useState([{ Week: 'No week found', TPP: 0, _id: 0 }]);
  const { authState } = useOktaAuth();

  const notificationAlertRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.SERVER}/seasons/current`, {
        headers: {
          'x-sheldyn-Authorization': authState.accessToken.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSeasons(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [setSeasons, authState.accessToken.accessToken]);
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
    axios
      .get(`${process.env.SERVER}/seasons/reset`, {
        headers: {
          'x-sheldyn-Authorization': authState.accessToken.accessToken,
        },
      })
      .then((response) => {
        const tpp = (response.data.tpp.value.TPP = 0);
        const options = {
          place: 'tr',
          message: `You have reset the season! Round Total is now ${tpp}`,
          type: 'primary',
          icon: 'tim-icons icon-alert-circle-exc',
          autoDismiss: 15,
        };
        notificationAlertRef.current.notificationAlert(options);
        setSeasons([response.data.tpp.value]);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  return (
    <div className="content">
      <NotificationAlert ref={notificationAlertRef} />
      <UnderConstruction title="Seasons" description="Under construction" />
      <h3>Current Bob Season</h3>
      <p>{`Season: ${seasons[0]._id}` || 'no data found'}</p>
      <p>{`Week: ${seasons[0].Week}` || 'no data found'}</p>
      <p>{`Total Possible Points: ${seasons[0].TPP}` || 'no data found'}</p>
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
    </div>
  );
};

export default Seasons;
