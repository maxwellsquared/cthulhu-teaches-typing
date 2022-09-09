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
  const { user, currentKeyboard } = useContext(UserContext);
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
          <ul>
            {scoresFromServer.map((score, index) => {
              // if score.user is the 
              return (
                <li key={index} className="text-red-500">
                  {score.user} - {score.wpm} wpm
                </li>
              );
            })}
          </ul>
          <button
            className="text-xlg mt-10 transform rounded-lg
			text-cosmic-purple hover:bg-blood-red-hover"
            onClick={closeModal}
          >
            CLOSE
          </button>
          {user ? (
            <>
              <div className="font-gold-hover mt-10 transform rounded-lg text-lg text-blood-red">
                Results has been automatically added to your keyboard stats!
              </div>
              <Link
                className="font-gold-hover mt-3 transform rounded-lg text-lg text-blood-red"
                to="/user"
              >
                See all results{' '}
                <span className="text-link-green underline hover:text-pale-gold">here</span>
              </Link>
            </>
          ) : (
            <div />
          )}
        </div>
      </Modal>
    </>
  );
}
