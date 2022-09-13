import axios from 'axios';
import { useState, useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useContext } from 'react';
import { UserContext } from '../helpers/context';
import { TbMedal } from 'react-icons/tb';

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

  return (
    <div className="mb-5 flex w-full flex-col items-center justify-center rounded-lg border-2 border-kinda-teal bg-darker-beige p-2 text-dark-navy dark:border-blood-red-hover dark:bg-darker-purple dark:text-pale-gold">
      {loading ? (
        <BarLoader color={'#5118a7'} width={'50%'} height={8} />
      ) : (
        <>
          <div className="flex items-center gap-3">
            <h1 className="my-3 text-4xl font-bold dark:text-pale-gold">Leaderboard</h1>
            <TbMedal className="inline-block text-4xl text-candle" />
          </div>
          <table className="mb-5 w-9/12 table-auto text-center text-lg font-light">
            <tr className="bg-darker-beige text-dark-navy dark:bg-cosmic-purple dark:text-pale-gold">
              <th className="px-4 py-2 text-center">Rank</th>
              <th className="px-4 py-2 text-center">Name</th>
              <th className="px-4 py-2 text-center">WPM</th>
              <th className="px-4 py-2 text-center">Date</th>
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
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{username}</td>
                  <td className="border px-4 py-2 text-center">{item['wpm']}</td>
                  <td className="border px-4 py-2 text-center">{date.toLocaleString()}</td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </div>
  );
}

export default Leaderboard;
