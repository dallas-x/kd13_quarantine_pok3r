import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import axios from 'axios';
import useReactiveTable from './Components/useReactTable';
import { Button, Row, Col } from 'reactstrap';

const Users = () => {
  const { authState } = useOktaAuth();
  const [players, setPlayers] = useState([]);
  const [col] = useState([
    { Header: 'ID', accessor: 'Player_ID' },
    { Header: 'Name', accessor: 'Player' },
    { Header: 'Games Played', accessor: 'Games_Played' },
    { Header: 'Active', accessor: 'Active' },
  ]);
  const [bob, BobTable] = useReactiveTable({
    columns: col,
    data: players,
  });

  useEffect(() => {
    axios
      .get(`${process.env.SERVER}/users/get`, {
        headers: {
          'x-sheldyn-Authorization': authState.accessToken.accessToken,
        },
      })
      .then((response) => {
        console.log(response.data);
        response.data.length === 0
          ? setPlayers([{ Player: 'Not Found', Player_ID: 'Unknown' }])
          : setPlayers(response.data);
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
