import React, { useRef, useState, useEffect } from 'react';
import Uploader from './components/Uploader';
import { auth, getUserDocument } from '../../firebase';
import NotificationAlert from 'react-notification-alert';

const UploadData = () => {
  const notificationAlertRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const alertSuccess = (options) => {
    notificationAlertRef.current.notificationAlert(options);
  };

  const getUser = async () => {
    const userDoc = await getUserDocument(auth.currentUser.uid);
    const snapshot = (await userDoc.get()).data();
    setUser(snapshot);
  };

  useEffect(() => {
    getUser();
    if (user) {
      setLoading(false);
    }
  }, [user, setLoading]);

  if (loading) {
    return <p>loading...</p>;
  } else {
    if (user.clubID === undefined || user.clubID === null) {
      return (
        <div className="content">
          <div className="">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Data Upload from Pokerrr 2</h3>
              <ul>
                <li>Looks Like it's your first time. Please upload a game file to get started.</li>
              </ul>
            </div>
            <Uploader user={auth.currentUser} newUser={true} alertSuccess={alertSuccess} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <div className="">
            <NotificationAlert ref={notificationAlertRef} />
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Data Upload from Pokerrr 2</h3>
              <ul>
                <li>Have Fun uploading</li>
              </ul>
            </div>
            <Uploader user={auth.currentUser} newUser={false} alertSuccess={alertSuccess} />
          </div>
        </div>
      );
    }
  }
};

export default UploadData;
