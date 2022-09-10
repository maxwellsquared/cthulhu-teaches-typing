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

  useEffect(() => {
    let localSwitch = props.gameOver;
    if (userClosed) localSwitch = false;
    setModalIsOpen(localSwitch);
    if (user && props.gameOver && !submitted) {
      submitScore(props.wpm, props.accuracy, user.id, currentKeyboard);
      setSubmitted(true);
    }
  });

  const closeModal = function () {
    setUserClosed(true);
    window.localStorage.setItem("user", JSON.stringify(user));
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
          <h1 className="modal-header">CONGRATULATIONS!</h1>
          <div className="player-data">
            {/* <p>USER: {props.user}</p> */}
            <p>WPM: {props.wpm}</p>
            <p>ACCURACY: {props.accuracy}%</p>
          </div>
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
