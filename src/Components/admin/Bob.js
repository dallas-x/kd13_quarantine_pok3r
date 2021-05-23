import React, { useState, useEffect, useRef } from 'react';
import useReactiveTable from './components/useReactTable';
import { Button, Row, Col, Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';
import { firestore } from '../../firebase';
import { collectIdsAndDocs } from '../../utilities';

const Bob = () => {
  const defaultState = [{ Player: 'Not Found', Player_ID: 'Unknown', Score: 0 }];
  const [players, setPlayers] = useState(defaultState);
  const [col] = useState([
    { Header: 'ID', accessor: 'Player_ID' },
    { Header: 'Name', accessor: 'Name' },
    { Header: 'Rank', accessor: 'Rank' },
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
  };

  useEffect(() => {
    // const getPost = async () => {
    //   const snapshot = await firestore
    //     .collection('Bob/5f5e72a2817f77659582edeb/scoreBoard')
    //     .orderBy('Rank', 'desc')
    //     .get();
    //   const scoreBoard = snapshot.docs.map(collectIdsAndDocs);
    //   setPlayers(scoreBoard);
    // };
    // getPost();
  }, []);

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
            {players[0].Name}{' '}
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
