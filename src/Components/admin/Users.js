import React, { useState, useEffect } from 'react';
import useReactiveTable from './Components/useReactTable';
import { Button, Row, Col } from 'reactstrap';

const Users = () => {
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
    // do something with firebase
  }, []);
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
