import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../helpers/context';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import { Line, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Legend } from 'recharts';

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
    <AreaChart width={800} height={400} data={userStats}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <Line type="monotone" dataKey="wpm" stroke="#EEDCB2" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="wpm" stroke="#EEDCB2" fillOpacity={1} fill="url(#colorUv)" />
      <Legend verticalAlign="top" height={36} />
    </AreaChart>
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
    <div className="mt-10 flex flex-col items-center justify-center">
      {userStats ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-3 text-4xl font-bold text-blood-red">{user.name} Stats</h1>
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
