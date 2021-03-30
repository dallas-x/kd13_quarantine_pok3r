import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import UnderConstruction from './Components/UnderConstruction';
import Uploader from './Components/Uploader';

const Tournaments = () => {
  const { authState } = useOktaAuth();
  return (
    <div className="content">
      <UnderConstruction title="Upload CSV File" description="Under construction" />
      <Uploader accessToken={authState.accessToken.accessToken} />
    </div>
  );
};

export default Tournaments;
