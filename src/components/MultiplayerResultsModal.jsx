import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../helpers/context';
import Modal from 'react-modal';
import SubmitUserScore from './SubmitUserScore';
import submitScore from '../helpers/submitScore';
import { Link } from 'react-router-dom';

// Modal.setAppElement(document.getElementById('app'));

export default function ResultsModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(props.gameOver);
  const [userClosed, setUserClosed] = useState(props.gameOver);
  const { user, guestName } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const { gameOver, winner, scoresFromServer } = props;

  useEffect(() => {
    let localSwitch = props.gameOver;
    if (userClosed) localSwitch = false;
    setModalIsOpen(localSwitch);
    if (user && props.gameOver && !submitted) {
      // submitScore(props.wpm, props.accuracy, user.id, currentKeyboard);
      setSubmitted(true);
    }
  });

  const closeModal = function () {
    setUserClosed(true);
    window.localStorage.setItem('user', JSON.stringify(user));
    window.location.reload(false);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        className="Modal"
        overlayClassName="Overlay"
        disableAutoFocus={true}
        ariaHideApp={false}
      >
        <div className="modal-container">
          <h1>CONGRATULATIONS!</h1>
          <div className="text-3xl text-pale-gold">
            <p>
              WINNER:
              <span className="text-blood-red"> {winner.user}</span>
            </p>
            <p>
              WPM:
              <span className="text-blood-red"> {winner.wpm}</span>
            </p>
            <p>
              ACCURACY:
              <span className="text-blood-red"> {winner.accuracy}%</span>
            </p>
          </div>

          <table className="my-10 w-9/12 table-auto text-center text-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">User</th>
                <th className="px-4 py-2 text-center">WPM</th>
                <th className="px-4 py-2 text-center">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {scoresFromServer.map((score, index) => {
                // if score.user is the same as guestName, do not display it
                return (
                  <tr key={index}>
                    <td className="border bg-modal-purple px-4 py-2 text-center">{score.user}</td>
                    <td className="border bg-modal-purple px-4 py-2 text-center">{score.wpm}</td>
                    <td className="border bg-modal-purple px-4 py-2 text-center">
                      {score.accuracy}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            className="transform rounded-lg text-lg
			text-cosmic-purple hover:bg-blood-red-hover"
            onClick={closeModal}
          >
            CLOSE
          </button>
        </div>
      </Modal>
    </>
  );
}
