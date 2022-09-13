import axios from 'axios';

const submitScore = function (wpm, accuracy, user_id, keyboard_id, difficulty) {
  const data = {
    wpm: wpm,
    user_id: user_id,
    accuracy: accuracy,
    difficulty: difficulty,
  };

  axios
    .post(`https://stark-fortress-32519.herokuapp.com/submit`, data, {
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