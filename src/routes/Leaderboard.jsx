import axios from "axios";
import { useState, CSSProperties } from "react";
import BarLoader from "react-spinners/BarLoader";



function Leaderboard() {
  const [loading, setLoading] = useState(true);

  function sendRequest(setLoading) {
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
          //setLoading(false);
          resolve(res.data);

        })
        .catch((err) => {
          console.log(err);
          //setLoading(false);
          reject(err);
        });
    }))


  }
  let leaderboardData;
  let leaderboardPromise = sendRequest(setLoading);
  leaderboardPromise.then((data) => {
    leaderboardData = data;
    console.log(leaderboardData);
  })


  return (
    loading ? <BarLoader color={'#5118a7'}/> : <h1 className="mt-5">This is the Leaderboard</h1>
  );

}

export default Leaderboard;
