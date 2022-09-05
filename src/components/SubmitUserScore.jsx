import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';

const SubmitUserScore = ({ wpm, accuracy, closeModal }) => {
  const { user } = useContext(UserContext);

  const [buttonText, setButtonText] = useState('SUBMIT SCORE');

  const data = {
    wpm: wpm,
    user_id: user.id,
  };

  const postRequest = () => {
    setButtonText('SUBMITTING...');
    axios
      .post(`http://localhost:3000/submit`, data, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        console.log('Success: user score submitted');
        setButtonText('SCORE SUBMITTED ✅');
      })
      .catch((err) => {
        setButtonText('ERROR: TRY AGAIN');
        console.log('Error has occurred');
        console.log(err);
      });
  };

  return <button onClick={() => postRequest()}>{buttonText}</button>;
};

export default SubmitUserScore;
