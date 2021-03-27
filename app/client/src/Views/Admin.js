import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Uploader from '../Components/Uploader';
import Sidebar from '../Components/Navigation/Sidebar';
import axios from 'axios';
import Stats from '../Components/Stats';
import { Button, Container, Row, Col, Table, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const Admin = () => {
  const { authState } = useOktaAuth();
  const [processAlert, setProcessAlert] = useState(false);
  const [stats, setStats] = useState([{ Players: [{ Player: 'Not Found', Score: 0 }] }]);
  const [col, setCol] = useState([
    { Header: '#', accessor: 'Rank' },
    { Header: 'ID', accessor: 'Player_ID' },
    { Header: 'Name', accessor: 'Player' },
    { Header: 'Score', accessor: 'Score' },
  ]);

  const handleFileProcess = (processAlert) => {
    setProcessAlert(processAlert);
  };
  const onDismiss = () => setProcessAlert(false);

  async function handleRefresh() {
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
    setStats(Players);
  }

  async function handleReset() {
    await axios
      .get('/api/players/reset', {
        headers: {
          Authorization: authState.accessToken.accessToken,
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
          handleRefresh();
          return 'success';
        } else {
          return stats;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  if (authState.isPending) {
    return (
      <div className="profile-page">
        <div className="wrapper">
          <section className="section">
            <Container>Loading...</Container>
          </section>
        </div>
      </div>
    );
  }
  if (!authState.isAuthenticated) {
    return <Redirect to="login" />;
  }
  return (
    <div className="main-panel">
      <Sidebar />
      <div className="content">
        <div className="wrapper">
          <div className="space-110"></div>
          <div className="space-110"></div>
          <section className="section">
            <Alert color="success" isOpen={processAlert} toggle={onDismiss}>
              File was processed successfully.
            </Alert>
          </section>
          <div className="space-110"></div>
          <section className="section">
            <Container>
              <Row>
                <Col col-md-7></Col>
                <Col col-md-4>
                  <h1 className="profile-title text-left text-left">Total Possible Points</h1>
                  <h5 className="text-on-back">0</h5>
                </Col>
              </Row>
              <Row>
                <Uploader
                  accessToken={authState.accessToken.accessToken}
                  onProcessFile={handleFileProcess}
                />
              </Row>
              <br />
              <h2> BOB </h2>
              <Row>
                <Col>
                  <div className="btn-wrapper">
                    <Button onClick={handleRefresh} className="btn-simple" color="success">
                      <i className="tim-icons icon-refresh-02" /> Refresh
                    </Button>
                    <Button onClick={handleReset} className="btn-simple" color="warning">
                      <i className="tim-icons icon-refresh-01" /> Reset
                    </Button>
                    <Button onClick={handleReset} className="btn-simple" color="danger">
                      <i className="tim-icons icon-trash-simple" /> Delete
                    </Button>
                  </div>
                </Col>
              </Row>

              <Stats columns={col} data={stats} />
            </Container>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
