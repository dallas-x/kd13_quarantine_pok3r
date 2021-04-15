import React, { useEffect, useState } from 'react';
import ComingSoon from './Components/ComingSoon';
import { firestore } from '../../firebase';

const Dashboard = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async () => {
      const post = await firestore.collection('posts').get();
      console.log(post);
    };
  }, [setPost]);

  return (
    <div className="content">
      <ComingSoon title="Dashboard" description="User Dashboards are coming soon!" />
    </div>
  );
};

export default Dashboard;
