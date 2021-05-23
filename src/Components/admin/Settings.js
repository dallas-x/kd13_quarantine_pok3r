import React, { useEffect, useState } from 'react';
import { auth, getUserDocument } from '../../firebase';
import UnderConstruction from './Components/UnderConstruction';

const Settings = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(async () => {
    const user = await getUserDocument(auth.currentUser.uid);
    console.log(user);
  }, []);
  return (
    <div className="content">
      <UnderConstruction title="Settings" description="Under construction" />
    </div>
  );
};

export default Settings;
