import React, { useEffect, useState } from 'react';
import QA from './QA';
import './SnakeAndLadder.css';
import { NavLink, useNavigate } from 'react-router-dom';
import CongratulationsModal from './Congratulation';
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
  const [userlevel, setUserlevel] = useState(1);
  const navigate = useNavigate();
  const [showCongratulations, setShowCongratulations] = useState(false); // State to control the visibility of Congratulations component
 
  const getCurrentUserLevel = async (userId) => {
    try {
      const url = 'http://localhost:8081/GetCurrentLevel'; // Replace this with your backend endpoint
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userId,
        }),
      });
  
      const data = await response.json();
     console.log(data.level[0].user_level,"trying");
      if (data.success) {
        return data.level[0].user_level;
      } else {
        console.log('Failed to fetch user level:', data.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user level:', error.message);
      return null;
    }
  };
  useEffect(() => {
    console.log(userlevel, "this is user level in front end");
  }, [userlevel]);

  useEffect(() => {
    const userId = localStorage.getItem('userid');
    if (userId) {
      getCurrentUserLevel(userId)
        .then((level) => {
          if (level !== null) {
            setUserlevel(level);
          }
        })
        .catch((error) => {
          console.error('Error fetching user level:', error);
        });
    }
  }, []);
  
  

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
       if (id <= userlevel) {
    setSelectedCell(id);
    // Rest of your code for fetching questions and handling clicks
  }
    setcurrentQuestionIndex(0);
    setSubmitButton(0);
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
        setShowCongratulations(true);
        setTimeout(() => {
          setShowCongratulations(false); // Hide Congratulations component after 4 seconds
        }, 4000);
        
        setOption1(Math.min(loader1Progress + 1, 5));
        setOption2(Math.min(loader2Progress + 2, 5));
        
        console.log('this code executed');
        
        // Check if the currentCell is one of the special cells
        if (selectedCell === 30 && count < 2) {
          setSubmitButton(0);
          setSelectedCell(selectedCell + 1);
          setcurrentQuestionIndex(0);
          setCount(0);
        } else if (selectedCell === 5 && count < 2) {
          setSubmitButton(0);
          setSelectedCell(selectedCell + 21);
          setcurrentQuestionIndex(0);
          setCount(0);
        } else if (selectedCell === 9 && count < 2) {
          setSubmitButton(0);
          setSelectedCell(selectedCell + 21);
          setcurrentQuestionIndex(0);
          setCount(0);
        } else {
          // Update userlevel state after successfully completing all questions
          try {
            const url = 'http://localhost:8081/PostLevel';
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                level: userlevel + 1,
                userid: userId,
                // Add other parameters if needed
              }),
            });
  
            // Update userlevel state if the POST request is successful
            if (response.ok) {
              setUserlevel(userlevel + 1);
            } else {
              console.error('Failed to update user level:', response.statusText);
            }
          } catch (error) {
            console.error('Error sending POST request to backend:', error.message);
          }
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
      if (selectedCell === 5 || selectedCell === 9 || selectedCell === 31) {
        setCount(count + 1);
        console.log(count);
        if (count > 2) {
          setSelectedCell(selectedCell + 1);
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
      let cellContent = i;
      let cellClassName = "grid-cell";
      if (i === userlevel) {
        // Display an icon for the current level cell
        cellContent = <img src="./img/chess-icon1.svg" alt="Current Level" />;
      }
      if (i > userlevel) {
        // Disable clicking on cells greater than the user's current level
        cellClassName += " disabled-cell";
      }
      gridItems.push(
        <div key={uniqueId} className={cellClassName} onClick={() => handleCellClick(i)}>
          <div className="level-number">{cellContent}</div> {/* Level number or icon */}
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
          {!showCongratulations ? ( // Conditionally render Congratulations component
            <div>
              <QA question={question} options={option} onSelectOption={setSelectedOption} />
              <p className='levelno'> You are On Level: {selectedCell}</p>
              <button className="Submit-Button" onClick={handleSubmit}>
                <span className='btn-cont'>Submit</span>
              </button>
              {submitButton === 1 ? <button className='Submit-Button' onClick={() => handleCellClick(selectedCell + 1)}><span className='btn-cont'>Continue</span></button> : null}
            </div>
          ) : (
            <CongratulationsModal /> // Render Congratulations component
          )}
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
