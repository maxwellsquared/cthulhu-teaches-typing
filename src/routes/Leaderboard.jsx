import axios from 'axios';
import { useState, useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useContext } from 'react';
import { UserContext } from '../helpers/context';

function Leaderboard() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState();
  function sendRequest(setLeaderboardData, setLoading) {
    return new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/api/leaderboard`, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          // if server returns 200 (success)
          if (res.status === 200) {
            setLoading(false);
            setLeaderboardData(res.data);
            resolve(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          reject(err);
        });
    });
  }
  useEffect(() => {
    sendRequest(setLeaderboardData, setLoading);
  }, []);

  useEffect(() => {
    if (leaderboardData) {
      console.log(leaderboardData);
    }
  }, [leaderboardData]);

  return loading ? (
    <BarLoader color={'#5118a7'} width={'50%'} height={8} />
  ) : (
    <>
      <h1 className="text-dark-navy dark:text-pale-gold">Leaderboard</h1>
      <table>
        <tr className="bg-darker-beige text-dark-navy dark:bg-cosmic-purple dark:text-pale-gold">
          <th>Rank</th>
          <th>Name</th>
          <th>WPM</th>
          <th>Date</th>
        </tr>
        {leaderboardData.map((item, index) => {
          let date = new Date(item['created_at']);
          let username = item['name'];
          if (user) {
            if (user.id === item.user_id) {
              username = `${item['name']} (you)`;
            }
          }
          return (
            <tr
              key={index}
              className="bg-darker-beige text-dark-navy dark:bg-cosmic-purple dark:text-pale-gold"
            >
              <td>{index + 1}</td>
              <td>{username}</td>
              <td>{item['wpm']}</td>
              <td>{date.toLocaleString()}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}

export default Leaderboard;
