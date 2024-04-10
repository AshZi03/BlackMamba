import React from "react";
import './Instruction.css'

const Instruction= () =>{
return(
    <>
        <div className="Head">
            <h3>Welcome to New Way of Learning Languages</h3>
          <ol style={{color: "white", fontFamily: "revert"}}>
            <li style={{fontWeight: "bold"}}>Setup</li>
            <ul>
                <li>The game based Learning  is typically played and Learned on a square board with numbered grid squares. Users starts at square 1.</li>
                <li>It is refered from traditional board that has 100 squares, arranged in a 10x10 grid.</li>
                <li>It starts from top instead of bottom.</li>
            </ul>
            <li style={{fontWeight: "bold"}}>Objective</li>
            <ul>
                <li>The objective of the game is that Users to reach 100 levels by learning and enjoying .</li>
            </ul>
            <li style={{fontWeight: "bold"}}>Gameplay</li>
            <ul>
                <li>Players takes Quizes which helps in advancing  themselevs to next level.</li>
                <li>If a player lands on a square with the bottom of a ladder, they can gget advance at the top of the ladder by completing Quiz with 5/5 correct answer.</li>
                <li> If a player lands on a square with the head of a snake, they must move their game piece to the square at the snake's tail.</li>
            </ul>
            <li style={{fontWeight: "bold"}}>Ladders and Snakes</li>
            <ul>
                <li>Ladders typically connect lower-numbered squares to higher-numbered squares, helping players advance quickly.</li>
                <li>Snakes do the opposite, sending players who land on higher-numbered squares back to lower-numbered squares.</li>
            </ul>
          </ol>
        </div>
    </>
)


}

export default Instruction