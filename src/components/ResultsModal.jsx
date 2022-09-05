import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../helpers/context';
import Modal from 'react-modal';
import SubmitUserScore from './SubmitUserScore';

// Modal.setAppElement(document.getElementById('app'));

export default function ResultsModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(props.gameOver);
  const [userClosed, setUserClosed] = useState(props.gameOver);

  const { user } = useContext(UserContext);

  useEffect(() => {
    let localSwitch = props.gameOver;
    if (userClosed) localSwitch = false;
    setModalIsOpen(localSwitch);
  });

  const closeModal = function () {
    setUserClosed(true);
  };

  return (
    <div>
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
          {user ? <SubmitUserScore wpm={props.wpm} accuracy={props.accuracy} /> : null}
        </div>
      </Modal>
    </div>
  );
}
