import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Uploader from '../components/Uploader';
import axios from 'axios';
import Stats from '../components/Stats';
import { Button, Container, Row, Col, Table, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

const Admin = () => {
  const { authState } = useOktaAuth();
  const [processAlert, setProcessAlert] = useState(false);
  const [stats, setStats] = useState([]);

  const handleFileProcess = (processAlert) => {
    setProcessAlert(processAlert);
    handleRefresh();
  };
  const onDismiss = () => setProcessAlert(false);

  async function handleRefresh() {
    const Players = await axios
      .get('/api/players/get')
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    setStats(Players || []);
  }

  async function handleReset() {
    await axios
      .get('/api/players/reset')
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
    <div className="profile-page">
      <div className="wrapper">
        <div className="space-110"></div>
        <div className="space-110"></div>
        <section className="section">
          <Alert color="success" isOpen={processAlert} toggle={onDismiss}>
            File was processed successfully.
          </Alert>
          <Container>
            <Row className="justify-content-between">
              <Col className="col-md-6">
                <h1>Admin Section</h1>
              </Col>
              <Col className="col-md-5">
                <h1 className="profile-title text-left">Data Refresh</h1>
                <h5 className="text-on-back">A0.2</h5>
                <div className="profile-description">
                  <p className="text-alt">This will refresh the table below</p>
                  <p className="text-alt">
                    Please make all feature request or report bugs by using the
                    &ldquo;Feedback?&ldquo; button below. Below are current items for the next
                    sprint.
                  </p>
                  <ul>
                    <li>Move upload function to Modal(pop-up window)</li>
                    <li>Stats Table automatically updates</li>
                    <li>Stats Table to be moved to main page</li>
                    <li>Implement Auth, login, register pages</li>
                  </ul>
                </div>
                <div className="btn-wrapper">
                  <a
                    href="https://github.com/k1ddarkn3ss/kd13_quarantine_pok3r/issues"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary mt-3"
                  >
                    <i className="tim-icons icon-satisfied" />
                    Feedback
                  </a>
                </div>
              </Col>
            </Row>
            <Row>
              <Uploader onProcessFile={handleFileProcess} />
            </Row>
          </Container>
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
            <div className="btn-wrapper">
              <Button onClick={handleRefresh} className="btn-simple" color="warning">
                <i className="tim-icons icon-refresh-01" /> Refresh
              </Button>
              <Button onClick={handleReset} className="btn-simple" color="danger">
                <i className="tim-icons icon-trash-simple" /> Reset
              </Button>
            </div>

            <Table hover borderless>
              <thead className="bg-warning">
                <tr>
                  <th className="text-left" scope="col">
                    #
                  </th>
                  <th className="text-center" scope="col">
                    ID
                  </th>
                  <th className="text-right" scope="col">
                    Player
                  </th>
                  <th className="text-right" scope="col">
                    Score
                  </th>
                  <th className="text-right" scope="col">
                    Total
                  </th>
                </tr>
              </thead>
              <Stats Players={stats} />
            </Table>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Admin;
