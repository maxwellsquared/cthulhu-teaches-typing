import axios from 'axios';

const submitScore = function (wpm, accuracy, user_id, keyboard_id) {
  const data = {
    wpm: wpm,
    user_id: user_id,
    accuracy: accuracy,
    keyboard_id: keyboard_id,
  };

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

}

export default submitScore;