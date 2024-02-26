// Content.js

import React from 'react';

const Content = ({ selectedOption }) => {
  return (
    <div>
      {selectedOption ? (
        <div>
          <h2>Selected Option</h2>
          <p>{selectedOption}</p>
        </div>
      ) : (
        <div>
          <h2>No option selected</h2>
        </div>
      )}
    </div>
  );
};

export default Content;
