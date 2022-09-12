import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../helpers/context';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader';
import { CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart, Legend } from 'recharts';
import KeyboardDropdown from '../components/KeyboardDropdown';

const User = () => {
  const { user, userKeyboards, setUserKeyboards, setCurrentKeyboard, currentKeyboard } =
    useContext(UserContext);

  const [userStats, setUserStats] = useState();

  // axios get request to get user data
  const getUserData = (userId) => {
    axios
      .get(`http://localhost:3000/api/user/${userId}`)
      .then((res) => {
        setUserStats(res.data); // set user data to state
      })
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
      });
  };

  const deleteKeyboard = function (keyboard_id) {
    axios
      .delete(`http://localhost:3000/keyboards/${keyboard_id}`, {})
      .then((res) => {
        console.log('Success: Keyboard deleted');
      })
      .then(getKeyboardsByUserId(user.id))
      .then(setCurrentKeyboard('1'))
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
      });
  };

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
    }
  }, []);

  // returns data for a specific keyboard_id, or all keyboards if keyboard_id is undefined
  // used to generate graph with wpm and accuracy data
  const getKeyboardData = (keyboard_id) => {
    if (keyboard_id && userStats) {
      // convert keyboard_id into a number
      let keyboardInteger = parseInt(keyboard_id);
      // create array of user stats which contain the keyboardInteger
      const keyboardStats = userStats.filter((stat) => stat.keyboard_id === keyboardInteger);
      return keyboardStats;
    }
    // return all the keyboards and user stats if no keyboard_id is provided
    return userStats;
  };

  const specificKeyboardStats = (
    <AreaChart width={800} height={400} data={getKeyboardData(currentKeyboard)}>
      <defs>
        <linearGradient id="wpm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#2D888C" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#2D888C" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="accuracy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8C3D34" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8C3D34" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="#4E3278" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="wpm" stroke="#2D888C" fillOpacity={1} fill="url(#wpm)" />
      <Area
        type="monotone"
        dataKey="accuracy"
        stroke="#8C3D34"
        fillOpacity={1}
        fill="url(#accuracy)"
      />

      <Legend verticalAlign="top" height={36} />
    </AreaChart>
  );

  const wpmStatsChart = (
    <AreaChart width={800} height={400} data={userStats} syncId="chartSync">
      <defs>
        <linearGradient id="wpm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#2D888C" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#2D888C" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="#4E3278" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="wpm" stroke="#2D888C" fillOpacity={1} fill="url(#wpm)" />

      <Legend verticalAlign="top" height={36} />
    </AreaChart>
  );

  const accuracyStatsChart = (
    <AreaChart width={800} height={400} data={userStats} syncId="chartSync">
      <defs>
        <linearGradient id="accuracy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8C3D34" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8C3D34" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="#4E3278" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[(dataMin) => dataMin - 5, (dataMax) => dataMax]} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="accuracy"
        stroke="#8C3D34"
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
    <div className="my-10 flex flex-col items-center justify-center">
      {userStats ? (
        <>
          <div className="mb-5 flex w-full flex-col items-center justify-center rounded-lg border-2 border-kinda-teal bg-darker-beige p-2 dark:border-blood-red-hover dark:bg-darker-purple">
            <h1 className="my-3 text-4xl font-bold dark:text-pale-gold">Keyboard Stats</h1>
            <div className="flex justify-center gap-3">
              <KeyboardDropdown />
              <button
                className="bg-red group relative flex transform justify-center rounded-md border border-transparent py-1  px-2 text-sm font-medium text-dark-navy transition duration-300 ease-in-out hover:scale-105 hover:bg-kinda-teal focus:outline-none focus:ring-2 focus:ring-blood-red focus:ring-offset-2 dark:bg-pale-gold  dark:text-blood-red dark:hover:bg-blood-red dark:hover:text-pale-gold"
                onClick={() => {
                  deleteKeyboard(currentKeyboard);
                  setTimeout(() => {
                    setUserKeyboards(
                      userKeyboards.filter(function (keyboard) {
                        // eslint-disable-next-line eqeqeq
                        return keyboard.id != currentKeyboard;
                      })
                    );
                  }, 200);
                }}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                Delete Keyboard
              </button>
            </div>
            <div className="mr-7">{specificKeyboardStats}</div>
          </div>

          <div className="mb-5 flex w-full flex-col items-center justify-center rounded-lg border-2 border-kinda-teal bg-darker-beige p-2 dark:border-blood-red-hover dark:bg-darker-purple">
            <h1 className="my-3 text-4xl font-bold dark:text-pale-gold">Overall Stats</h1>
            <div className="mr-7">{wpmStatsChart}</div>
            <div className="mr-7">{accuracyStatsChart}</div>
          </div>

          <div className="mb-5 flex w-full flex-col items-center justify-center rounded-lg border-2 border-kinda-teal bg-darker-beige p-2 text-dark-navy dark:border-blood-red-hover dark:bg-darker-purple dark:text-pale-gold">
            <h1 className="my-3 text-4xl font-bold dark:text-pale-gold">Averages</h1>

            <table className="mb-5 w-9/12 table-auto text-center text-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-center">Words Per Minute</th>
                  <th className="px-4 py-2 text-center">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2 text-center">{getAverage('wpm')}</td>
                  <td className="border px-4 py-2 text-center">{getAverage('accuracy')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
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
