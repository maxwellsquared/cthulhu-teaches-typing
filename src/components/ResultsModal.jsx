import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../helpers/context';
import Modal from 'react-modal';
import submitScore from '../helpers/submitScore';
import submitGuestScore from '../helpers/submitGuestScore';

// Modal.setAppElement(document.getElementById('app'));

export default function ResultsModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(props.gameOver);
  const [userClosed, setUserClosed] = useState(props.gameOver);
  const { user, currentKeyboard } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    let localSwitch = props.gameOver;
    if (userClosed) localSwitch = false;
    setModalIsOpen(localSwitch);
    if (user && props.gameOver && !submitted) {
      submitScore(props.wpm, props.accuracy, user.id, currentKeyboard, props.difficulty);
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
          <div className="justify-self-start">
            <button
              className=" transform rounded-lg bg-darker-beige text-center text-lg text-dark-navy shadow-lg hover:scale-105 hover:bg-kinda-teal dark:bg-blood-red dark:text-pale-gold dark:hover:bg-blood-red-hover"
              onClick={closeModal}
            >
              X
            </button>
          </div>
          <div className="-mt-15 mr-20 flex flex-col items-center text-center">
            <h1 className="modal-header text-dark-navy dark:text-pale-gold">CONGRATULATIONS!</h1>
            <div className="player-data">
              <p>WPM: {props.wpm}</p>
              <p>ACCURACY: {props.accuracy}%</p>
              <p>DIFFICULTY: {props.difficulty.toUpperCase()}</p>
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

          {user ? 
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
           :  !submitted  ? 
            <div className='guest-submit'>
              <p className='guest-submit'>Want to submit your results?</p>
              <input
                className='guest-submit'
                type="text"
                name="Name"
                placeholder="Enter a username"
                onChange={(event) => {
                  setGuestName(event.target.value);
                }}
              />
              <button
                className='guest-submit transform rounded-lg bg-darker-beige p-2 px-2 text-dark-navy shadow-lg hover:scale-105 hover:bg-kinda-teal dark:bg-blood-red dark:text-pale-gold dark:hover:bg-blood-red-hover'
                onClick={() => {
                  submitGuestScore(props.wpm, props.accuracy, guestName, currentKeyboard, props.difficulty);
                  setSubmitted(true);
                }}
              >
                Submit
              </button>
            </div>
          : <p className='guest-submit'>Your score has been submitted!</p> }
        </div>
      </Modal>
    </>
  );
}
