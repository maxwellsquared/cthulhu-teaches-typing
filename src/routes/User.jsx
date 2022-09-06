import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../helpers/context';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const User = () => {
  const { user } = useContext(UserContext);

  const [userStats, setUserStats] = useState();

  // axios get request to get user data
  const getUserData = () => {
    axios
      .get(`http://localhost:3000/api/user/${user.id}`)
      .then((res) => {
        console.log('Success: user data retrieved');
        setUserStats(res.data); // set user data to state
      })
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
      });
  };

  // useEffect to only load user data once
  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, []);

  const renderLineChat = (
    <LineChart width={800} height={400} data={userStats}>
      <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  // function to get average wpm
  const getAverageWpm = () => {
    let total = 0;
    userStats.forEach((stat) => {
      total += stat.wpm;
    });
    return Math.round(total / userStats.length);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {userStats ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-blood-red">{user.name}, here's your stats</h1>
          {renderLineChat}
          <h1 className="text-2xl font-bold text-blood-red">Average WPM: {getAverageWpm()}</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <BarLoader color={'#f00'} loading={true} size={150} />
          <p className="text-2xl font-bold text-blood-red">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default User;
