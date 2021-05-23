import React from 'react';
import { Row } from 'reactstrap';

const ComingSoon = ({ title, description }) => {
  return (
    <div className="container">
      <Row>
        <div className="card">
          <h3 className="card-title">{title}</h3>

          <div className="card-body">
            <div className="typography-line">
              <p className="blockquote blockquote-primary">{description}</p>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default ComingSoon;
