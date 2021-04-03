import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import useReactiveTable from './Components/useReactTable';
import { Button, Row, Col } from 'reactstrap';

const Users = () => {
  const { authState } = useOktaAuth();
  const [players, setPlayers] = useState([{ Players: [{ Player: 'Not Found', Score: 0 }] }]);
  const [col] = useState([
    { Header: '#', accessor: 'Rank' },
    { Header: 'ID', accessor: 'Player_ID' },
    { Header: 'Name', accessor: 'Player' },
  ]);
  const [bob, BobTable] = useReactiveTable({
    columns: col,
    data: players,
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
            <Button onClick="" className="btn-simple" color="success">
              <i className="tim-icons icon-single-02" /> Add Player
            </Button>
            <Button onClick="" className="btn-simple" color="danger">
              <i className="tim-icons icon-trash-simple" /> Remove Player
            </Button>
          </div>
        </Col>
      </Row>
      <br />

      <BobTable />
    </div>
  );
};

export default Users;