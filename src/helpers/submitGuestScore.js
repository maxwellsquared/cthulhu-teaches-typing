import axios from 'axios';

const submitGuestScore = function (wpm, accuracy, guestName, keyboard_id, difficulty) {
  const data = {
    wpm: wpm,
    user_id: 4,
    guest_name: guestName,
    accuracy: accuracy,
    keyboard_id: keyboard_id,
    difficulty: difficulty,
  };

  axios
    .post(`https://stark-fortress-32519.herokuapp.com/submit/guest`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => {
      console.log('Success: guest score submitted');
    })
    .catch((err) => {
      console.log('Error has occurred');
      console.log(err);
    });

}

export default submitGuestScore;