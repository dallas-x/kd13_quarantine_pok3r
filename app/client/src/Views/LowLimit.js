// This is for them regular folks
// For those 1 percenters who hog all the money.
import React from 'react';
import { Container } from 'reactstrap';

const HighRoller = () => {
  return (
    <div className="presentation-page">
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1" />
          <div className="squares square2" />
          <div className="squares square3" />
          <div className="squares square4" />
          <div className="squares square5" />
          <div className="squares square6" />
          <div className="squares square7" />
          <Container>
            <div className="content-center brand">
              <h1 className="h1-seo">Wins, and Losses</h1>
              <h3 className="d-none d-sm-block">Gamble Responsibly</h3>
              <p>
                {' '}
                With custom dashboards, alerts, and a community. We can not only show your poker
                face, we can help you know your limit, and prevent gambling addictions.
              </p>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HighRoller;
