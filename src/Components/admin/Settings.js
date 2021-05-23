import React, { useEffect, useState } from 'react';
import UnderConstruction from './Components/UnderConstruction';

const Settings = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    //do something here
  }, []);
  return (
    <div className="content">
      <UnderConstruction title="Settings" description="Under construction" />
      <p>{userInfo !== null ? userInfo.firstName : ''}</p>
    </div>
  );
};

export default Settings;
