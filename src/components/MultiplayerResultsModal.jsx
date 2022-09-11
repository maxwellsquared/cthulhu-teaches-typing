import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../helpers/context';
import Modal from 'react-modal';

export default function ResultsModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(props.gameOver);
  const [userClosed, setUserClosed] = useState(props.gameOver);
  const { user } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);

  const { winner, scoresFromServer } = props;

  useEffect(() => {
    let localSwitch = props.gameOver;
    if (userClosed) localSwitch = false;
    setModalIsOpen(localSwitch);
    if (user && props.gameOver && !submitted) {
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
          <h1 className="text-dark-navy dark:text-pale-gold">CONGRATULATIONS!</h1>
          <div className="text-3xl text-beige dark:text-pale-gold">
            <p>
              WINNER:
              <span className="text-dark-navy dark:text-blood-red"> {winner.user}</span>
            </p>
            <p>
              WPM:
              <span className="text-dark-navy dark:text-blood-red"> {winner.wpm}</span>
            </p>
            <p>
              ACCURACY:
              <span className="text-dark-navy dark:text-blood-red"> {winner.accuracy}%</span>
            </p>
          </div>

          <table className="my-10 w-9/12 table-auto text-center text-lg">
            <thead>
              <tr className="bg-darker-beige text-dark-navy dark:bg-cosmic-purple dark:text-pale-gold">
                <th className="px-4 py-2 text-center">User</th>
                <th className="px-4 py-2 text-center">WPM</th>
                <th className="px-4 py-2 text-center">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {scoresFromServer.map((score, index) => {
                // if score.user is the same as guestName, do not display it
                return (
                  <tr
                    key={index}
                    className="bg-darker-beige text-dark-navy dark:bg-cosmic-purple dark:text-pale-gold"
                  >
                    <td className="border px-4 py-2 text-center">{score.user}</td>
                    <td className="border px-4 py-2 text-center">{score.wpm}</td>
                    <td className="border px-4 py-2 text-center">{score.accuracy}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            className="text-dark-nav transform rounded-lg bg-darker-beige text-lg text-dark-navy shadow-lg  hover:scale-105 hover:bg-dark-navy hover:text-beige dark:bg-blood-red dark:text-pale-gold dark:hover:bg-blood-red-hover "
            onClick={closeModal}
          >
            CLOSE
          </button>
        </div>
      </Modal>
    </>
  );
}
