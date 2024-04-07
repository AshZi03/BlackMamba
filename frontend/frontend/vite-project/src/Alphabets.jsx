import React from 'react';
import './Alphabets.css'; // Make sure to import your CSS file

const Sample = ({alphabet, reading}) => {
  console.log('Alphabet:', alphabet);
  console.log('Reading:', reading);

  return (
    <div className="card1">
        <h1 className="card__title"><span>{alphabet}</span></h1>
      <div className="card__content">
        <h1 className="card__title"><span>{alphabet}</span></h1>
        <h1 className="card__description">
          {reading}
        </h1>
      </div>
    </div>
  
  );
}

export default Sample;
