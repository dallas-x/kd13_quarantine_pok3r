import React, { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import UnderConstruction from './Components/UnderConstruction';

const Settings = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { oktaAuth, authState } = useOktaAuth();
  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      setUserInfo(authState.accessToken.claims.user.profile);
    }
  }, [authState, oktaAuth]);
  return (
    <div className="content">
      <UnderConstruction title="Settings" description="Under construction" />
      <p>{userInfo !== null ? userInfo.firstName : ''}</p>
    </div>
  );
};

export default Settings;
