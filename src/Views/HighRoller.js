// For those 1 percenters who hog all the money.
import React from 'react';
import { Container } from 'reactstrap';

const HighRoller = () => {
  return (
    <div className="index-page">
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
              <h1 className="h1-seo">High Roller</h1>
              <h3 className="d-none d-sm-block">Higher stakes are comming soon...</h3>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HighRoller;
