import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../helpers/context';
import axios from 'axios';

const User = () => {
  const { user } = useContext(UserContext);

  const [userStats, setUserStats] = useState();
  const [error, setError] = useState();

  // axios get request to get user data
  const getUserData = () => {
    axios
      .get(`http://localhost:3000/api/user/${user.id}`)
      .then((res) => {
        console.log('Success: user data retrieved');
        setUserStats(res.data);
      })
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
        setError('Error: user data could not be retrieved');
      });
  };

  console.log(userStats);

  // useEffect to only load user data once
  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, []);

  const statsArr = userStats?.map((stat) => {
    return (
      <div key={stat.id} className="font-mono text-blood-red">
        <p>WPM: {stat.wpm}</p>
        <p>Date: {stat.created_at}</p>
      </div>
    );
  });

  return <>{statsArr}</>;
};

export default User;
