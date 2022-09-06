import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../helpers/context';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import { CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Legend } from 'recharts';

const User = () => {
  const { user } = useContext(UserContext);

  const [userStats, setUserStats] = useState();
  const [userKeyboards, setUserKeyboards] = useState();

  // axios get request to get user data
  const getUserData = (userId) => {
    axios
      .get(`http://localhost:3000/api/user/${userId}`)
      .then((res) => {
        console.log('Success: user data retrieved');
        setUserStats(res.data); // set user data to state
      })
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
      });
  };

  // axios request to get user keyboards using user id
  const getKeyboardsByUserId = (userId) => {
    const config = {
      method: 'get',
      url: `http://localhost:3000/keyboards/${userId}`,
      headers: {},
    };

    axios(config)
      .then((res) => {
        console.log('Success: user keyboards retrieved');
        setUserKeyboards(res.data); // set user keyboards to state
      })
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
      });
  };

  // useEffect to only load user data once
  useEffect(() => {
    if (user) {
      getUserData(user.id);
      getKeyboardsByUserId(user.id);
    }
  }, []);

  // array of keyboard names as a list
  const keyboardList = (keyboards) => {
    console.log('userKeyboards: ', keyboards);
    if (keyboards) {
      const keyboardNames = userKeyboards.map((keyboard) => {
        return (
          <li className="text-lg text-pale-gold" key={keyboard.id}>
            {keyboard.name}
          </li>
        );
      });
      return keyboardNames;
    }

    const noKeyboards = <li>You have no keyboards</li>;
    return noKeyboards;
  };

  const renderLineChat = (
    <AreaChart width={800} height={400} data={userStats}>
      <defs>
        <linearGradient id="wpm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="wpm" stroke="#EEDCB2" fillOpacity={1} fill="url(#wpm)" />

      <Legend verticalAlign="top" height={36} />
    </AreaChart>
  );

  const renderAccuracy = (
    <AreaChart width={800} height={400} data={userStats}>
      <defs>
        <linearGradient id="accuracy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis domain={[(dataMin) => dataMin - 5, (dataMax) => dataMax]} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="accuracy"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#accuracy)"
      />
      <Legend verticalAlign="top" height={36} />
    </AreaChart>
  );

  // function to get average wpm
  const getAverage = (key) => {
    let total = 0;
    userStats.forEach((stat) => {
      total += stat[key];
    });
    return Math.round(total / userStats.length);
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      {userStats ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-3 text-4xl font-bold text-blood-red">{user.name} Stats</h1>
          {renderLineChat}
          <h1 className="text-2xl font-bold text-blood-red">Average WPM: {getAverage('wpm')}</h1>
          {renderAccuracy}
          <h1 className="text-2xl font-bold text-blood-red">{`Average Accuracy: ${getAverage(
            'accuracy'
          )}%`}</h1>
          <h1 className="mt-3 mb-2 text-2xl font-bold text-blood-red">Keyboards</h1>
          <ul>{keyboardList(userKeyboards)}</ul>
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
