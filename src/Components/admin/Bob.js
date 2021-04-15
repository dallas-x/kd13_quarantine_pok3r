import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import useReactiveTable from './Components/useReactTable';
import { Button, Row, Col, Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

const Bob = () => {
  const { authState } = useOktaAuth();
  const defaultState = [{ Player: 'Not Found', Player_ID: 'Unknown', Score: 0 }];
  const [players, setPlayers] = useState(defaultState);
  const [col] = useState([
    { Header: 'ID', accessor: 'Player_ID' },
    { Header: 'Name', accessor: 'Player' },
    { Header: 'Score', accessor: 'Score' },
  ]);
  const [bob, BobTable] = useReactiveTable(
    {
      columns: col,
      data: players,
    },
    'BOB',
  );
  const notificationAlertRef = useRef(null);

  const woops = () => {
    let options = {};
    options = {
      place: 'tr',
      message: 'This will be deprecated soon, in the future you will need to start a new season!',
      type: 'default',
      icon: 'tim-icons icon-alert-circle-exc',
      autoDismiss: 15,
    };
    notificationAlertRef.current.notificationAlert(options);
    axios
      .get(`${process.env.SERVER}/players/reset`, {
        headers: {
          'x-sheldyn-Authorization': authState.accessToken.accessToken,
        },
      })
      .then(() => {
        setPlayers(defaultState);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.SERVER}/players/get`, {
        headers: {
          'x-sheldyn-Authorization': authState.accessToken.accessToken,
        },
      })
      .then((response) => {
        response.data.length === 0 ? setPlayers(defaultState) : setPlayers(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [bob, setPlayers, authState.accessToken.accessToken]);
  return (
    <div className="content">
      <div className="">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle text="center" tag="h1">
            <span className="emoji" role="img" aria-label="crown">
              👑
            </span>{' '}
            {players[0].Player}{' '}
            <span className="emoji" role="img" aria-label="crown">
              👑
            </span>
          </CardTitle>

          <CardSubtitle className="card-title">This weeks Best of the Best!</CardSubtitle>
        </CardHeader>

        <br />
        <CardBody className="card-body">
          <Row>
            <Col>
              <div className="btn-wrapper">
                <Button onClick={woops} className="btn-simple" color="warning">
                  <i className="tim-icons icon-refresh-01" /> Reset
                </Button>
              </div>
            </Col>
          </Row>
          <BobTable />
        </CardBody>
      </Card>
    </div>
  );
};

export default Bob;
