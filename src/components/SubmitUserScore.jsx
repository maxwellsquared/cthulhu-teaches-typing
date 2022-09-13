import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../helpers/context';

const SubmitUserScore = ({ wpm, accuracy }) => {
  const { user, currentKeyboard } = useContext(UserContext);

  const [buttonText, setButtonText] = useState('SUBMIT SCORE');

  console.log('currentKeyboard: ', currentKeyboard);

  const data = {
    wpm: wpm,
    user_id: user.id,
    accuracy: accuracy,
    keyboard_id: currentKeyboard,
  };

  const postRequest = () => {
    setButtonText('SUBMITTING...');
    axios
      .post(`https://stark-fortress-32519.herokuapp.com/submit`, data, {
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
