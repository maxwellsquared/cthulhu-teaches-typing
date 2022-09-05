import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';

const SubmitUserScore = ({ wpm, accuracy, closeModal }) => {
  const { user } = useContext(UserContext);

  const data = {
    wpm: wpm,
    user_id: user.id,
  };

  const postRequest = () => {
    axios
      .post(`http://localhost:3000/submit`, data, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        console.log('Success: user score submitted');
      })
      .catch((err) => {
        console.log('Error has occurred');
        console.log(err);
      });
  };

  return <button onClick={() => postRequest()}>SUBMIT SCORE</button>;
};

export default SubmitUserScore;
