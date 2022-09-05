import axios from "axios";
import { useState, CSSProperties, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";



function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState();
  function sendRequest(setLeaderboardData, setLoading) {
    return (new Promise((resolve, reject) => {
      axios
        .get(`http://localhost:3000/api/leaderboard`, {
          headers: {
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          // if server returns 200 (success)
          if (res.status === 200) {
          }
          setLoading(false);
          setLeaderboardData(res.data);
          resolve(res.data);

        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          reject(err);
        });
    }))
  }
  useEffect(() => {
    sendRequest(setLeaderboardData, setLoading);
  }, [])

  useEffect(() => {
    if (leaderboardData) {
      console.log(leaderboardData);
    }
  }, [leaderboardData])

  return (
    loading ? <BarLoader color={'#5118a7'} width={'50%'}height={8}/> : 
    <ul>
    {leaderboardData.map(item => {
      return <li>{item['wpm']}</li>;
    })}
  </ul>


  )



}

export default Leaderboard;
