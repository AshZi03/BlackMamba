// Import necessary dependencies
import React from 'react';
import QA from './QA';

// Define the SnakeAndLadder component
const SnakeAndLadder = () => {
  const [selectedCell, setSelectedCell] = React.useState(null);

  // Handle cell click
  const handleCellClick = (id) => {
    setSelectedCell(id);
  };

  // Handle submit button click
  const handleSubmit = () => {
    // Perform any submit logic here if needed
    // Reset selectedCell to bring back SnakeAndLadder component
    setSelectedCell(null);
  };

  // Render grid cells
  const generateGrid = () => {
    const gridItems = [];
    for (let i = 1; i <= 100; i++) {
      const uniqueId = `cell-${i}`;
      gridItems.push(
        <div
          key={uniqueId}
          className="grid-cell"
          onClick={() => handleCellClick(i)}
        >
          <img src={`./img/SL/sl${i}.png`} alt={`Image ${i}`} />
        </div>
      );
    }
    return gridItems;
  };

  // Render SnakeAndLadder component
  return (
    <div>
      {selectedCell ? (
        <div>
          <QA />
          <p>You are On Level: {selectedCell}</p>
          <button onClick={handleSubmit}>Submit</button>
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

// Export SnakeAndLadder component
export default SnakeAndLadder;
