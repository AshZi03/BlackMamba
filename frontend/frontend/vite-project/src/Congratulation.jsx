import React from 'react';
import './Congratulation.css';

function CongratulationsModal() {
  return (
    <div className="wrapper">
     <div className='box'>
     <span className='congrats'> Congratulations🐉</span>
     <span className='message'>You have successfully completed the Level</span>
     <img src="/img/congrats.gif" alt="congrats" />
     </div>
    </div>
  );
}

export default CongratulationsModal;