import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../helpers/context';
import Modal from 'react-modal';
import SubmitUserScore from './SubmitUserScore';
import submitScore from '../helpers/submitScore';

// Modal.setAppElement(document.getElementById('app'));

export default function ResultsModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(props.gameOver);
  const [userClosed, setUserClosed] = useState(props.gameOver);
  const { user, currentKeyboard } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log(props.gameOver);
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
          <button onClick={closeModal}>CLOSE</button>
          {user ? <div>SCORE SUBMITTED ✅</div> : <div />}
        </div>
      </Modal>
    </>
  );
}
