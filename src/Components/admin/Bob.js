import React, { useState, useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import useReactiveTable from './Components/useReactTable';
import { Button, Row, Col, Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

const Bob = () => {
  const { authState } = useOktaAuth();
  const [players, setPlayers] = useState([{ Players: [{ Player: 'Not Found', Score: 0 }] }]);
  const [col] = useState([
    { Header: '#', accessor: 'Rank' },
    { Header: 'ID', accessor: 'Player_ID' },
    { Header: 'Name', accessor: 'Player' },
    { Header: 'Score', accessor: 'Score' },
  ]);
  const [bob, BobTable] = useReactiveTable({
    columns: col,
    data: players,
  });
  const notificationAlertRef = useRef(null);

  const woops = () => {
    let options = {};
    options = {
      place: 'tr',
      message: 'This is deprecated, please start a new season!',
      type: 'default',
      icon: 'tim-icons icon-alert-circle-exc',
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  useEffect(() => {
    axios
      .get('https://testing-poker.herokuapp.com/players/get', {
        headers: {
          'x-sheldyn-Authorization': authState.accessToken.accessToken,
        },
      })
      .then((response) => {
        setPlayers(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [bob, setPlayers, authState.accessToken.accessToken]);
  return (
    <div className="content">
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>

      <Card className="card">
        <CardHeader>
          <CardTitle tag="h1">
            B{' '}
            <span className="emoji" role="img" aria-label="crown">
              👑
            </span>{' '}
            B
          </CardTitle>

          <CardSubtitle className="card-title">This weeks best of the best!</CardSubtitle>
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
