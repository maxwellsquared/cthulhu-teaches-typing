import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../helpers/context';
import Modal from 'react-modal';
import submitScore from '../helpers/submitScore';

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
    window.localStorage.setItem('user', JSON.stringify(user));
    window.location.reload(false);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        className="Modal rounded-md bg-kinda-teal dark:bg-modal-bg"
        overlayClassName="Overlay"
        disableAutoFocus={true}
        ariaHideApp={false}
      >
        <div className="modal-container">
          <h1 className="modal-header text-dark-navy dark:text-pale-gold">CONGRATULATIONS!</h1>
          <div className="player-data">
            <p>WPM: {props.wpm}</p>
            <p>ACCURACY: {props.accuracy}%</p>
          </div>
          <button
            className="text-xlg mt-10 transform rounded-lg bg-darker-beige p-2 px-6 text-dark-navy shadow-lg hover:scale-105 hover:bg-kinda-teal dark:bg-blood-red dark:text-pale-gold dark:hover:bg-blood-red-hover"
            onClick={closeModal}
          >
            CLOSE
          </button>
          <div>
            <p font-size="20">Want to submit your results?</p>
          </div>
          {user ? (
            <>
              <div className="font-gold-hover mt-10 transform rounded-lg text-lg text-dark-navy dark:text-blood-red">
                Results has been automatically added to your keyboard stats!
              </div>
              <Link
                className="font-gold-hover mt-3 transform rounded-lg text-lg text-dark-navy dark:text-blood-red"
                to="/user"
              >
                See all results{' '}
                <span className="text-darker-beige underline dark:text-link-green dark:hover:text-pale-gold">
                  here
                </span>
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
