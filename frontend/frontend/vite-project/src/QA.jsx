// FormComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios
import 'bootstrap/dist/css/bootstrap.min.css';

const QA = () => {
  const [textFromDatabase, setTextFromDatabase] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch text data from the database (replace the API endpoint with your actual endpoint)
    axios.get('your_api_endpoint')
      .then(response => {
        setTextFromDatabase(response.data.text);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="container mt-4">
      <div className="form-group">
        <label htmlFor="textArea">Text from Database:</label>
        <textarea
          className="form-control"
          id="textArea"
          value={textFromDatabase}
          readOnly
        />
      </div>

      <div className="form-group">
        <label>Choose an Answer:</label>
        <div className="btn-group" role="group" aria-label="Options">
          <button
            type="button"
            className={`btn ${selectedOption === 'Option1' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleOptionChange('Option1')}
          >
            Option 1
          </button>
          <button
            type="button"
            className={`btn ${selectedOption === 'Option2' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleOptionChange('Option2')}
          >
            Option 2
          </button>
          <button
            type="button"
            className={`btn ${selectedOption === 'Option3' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleOptionChange('Option3')}
          >
            Option 3
          </button>
          <button
            type="button"
            className={`btn ${selectedOption === 'Option4' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleOptionChange('Option4')}
          >
            Option 4
          </button>
          {/* Repeat the above button structure for other options */}
        </div>
      </div>
    </div>
  );
};

export default QA;
