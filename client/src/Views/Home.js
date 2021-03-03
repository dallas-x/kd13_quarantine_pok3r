import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'reactstrap';

const Home = () => {
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
              <h1 className="h1-seo">Quarantine Poker</h1>
              <h3 className="d-none d-sm-block">Vegas isn&apos;t so far away after all.</h3>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Home;
