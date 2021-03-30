import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import useReactiveTable from './Components/useReactTable';
import { Button, Row, Col } from 'reactstrap';

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
    title: 'Best of the Best',
  });
  async function getPlayers() {
    const Players = await axios
      .get('/api/players/get', {
        headers: {
          Authorization: authState.accessToken.accessToken,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    setPlayers(Players);
  }

  useEffect(() => {
    axios
      .get('/api/players/get', {
        headers: {
          Authorization: authState.accessToken.accessToken,
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
      <Row>
        <Col>
          <div className="btn-wrapper">
            <Button onClick={getPlayers} className="btn-simple" color="success">
              <i className="tim-icons icon-refresh-02" /> Refresh
            </Button>
            <Button onClick="" className="btn-simple" color="warning">
              <i className="tim-icons icon-refresh-01" /> Reset
            </Button>
          </div>
        </Col>
      </Row>
      <br />
      <BobTable />
    </div>
  );
};

export default Bob;
