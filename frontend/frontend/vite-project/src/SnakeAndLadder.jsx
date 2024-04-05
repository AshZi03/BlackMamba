import React, { useEffect, useState } from 'react';
import QA from './QA';
import './SnakeAndLadder.css';
import { NavLink, useNavigate } from 'react-router-dom';

const SnakeAndLadder = ({ loader1Progress, loader2Progress, setOption1, setOption2 }) => {
  const [selectedCell, setSelectedCell] = React.useState(null);
  const [language, setLanguage] = React.useState(null);
  const [question, setQuestion] = React.useState(null);
  const [option, setOption] = React.useState(null);
  const [answer, setAnswer] = React.useState(null);
  const [currentQuestionIndex, setcurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option
  const userId = localStorage.getItem('userid');
  const [length, setLength] = React.useState(0);
  const [submitButton, setSubmitButton] = useState(null); // State to store selected option
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setSubmitButton(0);
    const language = localStorage.getItem('Language');
    // Fetch the language value from localStorage when the component mounts
    const storedLanguage = localStorage.getItem('Language');
    setLanguage(storedLanguage);
    console.log(language);
  }, []); // Empty dependency array ensures that this effect runs only once after mount

  useEffect(() => {
    if (currentQuestionIndex !== null) {
      console.log(currentQuestionIndex);
      const fetchData = async () => {
        try {
          const url = 'http://localhost:8081/Questions'; // Replace this with your backend endpoint

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: selectedCell,
              language,
            }),
          });

          const data = await response.json();
          console.log(data);
          setQuestion(data.data[currentQuestionIndex].question_content);
          setOption(data.data[currentQuestionIndex].question_option);
          setAnswer(data.data[currentQuestionIndex].question_answer);
          if (data.success) {
            console.log('Data sent to backend successfully');
          } else {
            console.log('Sending data to backend failed:', data.message);
          }
        } catch (error) {
          console.error('Error sending data to backend:', error.message);
        }
      };

      fetchData();
    }
  }, [currentQuestionIndex, selectedCell, language]); // Include selectedCell as a dependency

  const handleCellClick = async (id) => {
    setcurrentQuestionIndex(0);
    setSubmitButton(0);
    setSelectedCell(id);

    try {
      const url = 'http://localhost:8081/Questions';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          language,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.data && data.data.length > 0) {
          if (currentQuestionIndex < data.data.length) {
            setLength(data.data.length);
            setQuestion(data.data[currentQuestionIndex].question_content);
            setOption(data.data[currentQuestionIndex].question_option);
            setAnswer(data.data[currentQuestionIndex].question_answer);
          } else {
            console.log('currentQuestionIndex out of bounds:', currentQuestionIndex);
          }
        } else {
          console.log('No questions received from the backend');
        }
      } else {
        console.log('Sending data to backend failed:', data.message);
      }
    } catch (error) {
      console.error('Error sending data to backend:', error.message);
    }
  };
  useEffect(() => {
    if (selectedOption !== null) {
      console.log('Selected option changed:', selectedOption);
      // Perform any operations based on the selected option here
    }
  }, [selectedOption]);

  const handleSubmit = async () => {
    if (selectedOption === answer) {
      console.log(selectedOption);
      console.log(answer);
      console.log(currentQuestionIndex);
      console.log(length);
      setSubmitButton(1);
      if (currentQuestionIndex === length - 1) {
        setOption1(loader1Progress + 1);
        setOption2(loader2Progress + 2);
        console.log('this code executed');
        if (selectedCell == 30 && count < 2) {
          setSubmitButton(0);
          setSelectedCell(selectedCell + 1);
          setcurrentQuestionIndex(0);
          setCount(0);
        }

        if (selectedCell == 5 && count < 2) {
          setSubmitButton(0);
          setSelectedCell(selectedCell + 21);
          setcurrentQuestionIndex(0);
          setCount(0);
        }
        if (selectedCell == 9 && count < 2) {
          setSubmitButton(0);
          setSelectedCell(selectedCell + 21);
          setcurrentQuestionIndex(0);
          setCount(0);
        }

        try {
          const url = 'http://localhost:8081/PostLevel';
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              level: selectedCell + 1,
              userid: userId,
              // Add other parameters if needed
            }),
          });
        } catch (error) {
          console.error('Error sending POST request to backend:', error.message);
        }
      } else {
        const audio = new Audio('/public/correct.mp3');
        audio.play();
        setcurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSubmitButton(0);
        console.log('Correct answer');
      }
    } else {
      console.log('Wrong answer');
      const audio = new Audio('/public/incorrect.mp3');
      audio.play();
      if (selectedCell === 5) {
        setCount(count + 1);
        console.log(count);
        if (count > 2) {
          setSelectedCell(selectedCell + 1);
          setcurrentQuestionIndex(0);
        }
      }
      if (selectedCell === 9) {
        setCount(count + 1);
        console.log(count);
        if (count > 2) {
          setSelectedCell(selectedCell + 1);
          setcurrentQuestionIndex(0);
        }
      }
      if (selectedCell === 31) {
        setCount(count + 1);
        console.log(count);
        if (count > 2) {
          setSelectedCell(selectedCell - 18);
          setcurrentQuestionIndex(0);
        }
      }
    }
  };

  // Render grid cells
  const generateGrid = () => {
    const gridItems = [];
    for (let i = 1; i <= 100; i++) {
      const uniqueId = `cell-${i}`;
      gridItems.push(
        <div key={uniqueId} className="grid-cell" onClick={() => handleCellClick(i)}>
          <div className="level-number">{i}</div> {/* Level number */}
          <img src={`./img/SL/sl${i}.png`} alt={`Image ${i}`} />
        </div>
      );
    }
    return gridItems;
  };

  // Render SnakeAndLadder component
  return (
    <div>
      {selectedCell && question && option ? (
        <div>
          <QA question={question} options={option} onSelectOption={setSelectedOption} />
          <p className='levelno'> You are On Level: {selectedCell}</p>
          <button className="Submit-Button" onClick={handleSubmit}>
            <span className='btn-cont'>Submit</span>
          </button>
          {submitButton === 1 ? <button className='Submit-Button' onClick={() => handleCellClick(selectedCell + 1)}><span className='btn-cont'>Continue</span></button> : null}
        </div>
      ) : (
        <div>
          <div className="grid-container">{generateGrid()}</div>
          {/* Optional: You can add other content or buttons here */}
        </div>
      )}
    </div>
  );
};

export default SnakeAndLadder;
