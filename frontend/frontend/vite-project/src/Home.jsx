import { useState } from 'react'
import "./Home.css";
import { NavLink } from 'react-router-dom';
import TopBar from './TopBar';
function Home() {
  const [count, setCount] = useState(0)

  return (
  <>
  <TopBar />
  
  <div className="container1">
  <div className="container-Home text-center">
  <video className="background-video" autoPlay loop muted>
          <source src="./video/background-video2.mp4" type="video/mp4" />
        
        </video>
      <h1 className="display-4">Welcome to BlackMamba</h1>
      <p className="lead second-line">Start your language learning journey today!</p>
    
      <NavLink className="SignUp-link" to={`/SignUp`}>
        <button className="btn  btn-lg homebuton"  role="button">Get Started</button>
      </NavLink>
    </div>
    </div>
  </>
  )
}

export default Home
