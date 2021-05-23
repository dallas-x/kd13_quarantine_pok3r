import React, { useEffect, useState } from 'react';
import ComingSoon from './Components/ComingSoon';
import { firestore } from '../../firebase';
import { collectIdsAndDocs } from '../../utilities';

const Dashboard = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      const snapshot = await firestore.collection('Leagues/k1ddarkn3ss/Players').get();
      const myPosts = snapshot.docs.map(collectIdsAndDocs);
      console.log(myPosts);
      setPosts({ myPosts });
    };

    const createPost = async (post) => {
      const player = { user: 'dallas', test: 'failed' };
      const docRef = await firestore.collection('Leagues/k1ddarkn3ss/Players').add(player);
      const doc = await docRef.get();
      console.log(doc);
    };

    createPost({ Title: 'My First Post', Content: 'My content' });
    getPost();
  }, []);

  return (
    <div className="content">
      <ComingSoon title="Dashboard" description="User Dashboards are coming soon!" />
    </div>
  );
};

export default Dashboard;
