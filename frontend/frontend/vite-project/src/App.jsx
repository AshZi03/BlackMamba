import { useState } from 'react'
import './App.css'
import './Home.jsx'
import Home from './Home.jsx'
import { NavLink } from 'react-router-dom'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUp from './SignUp.jsx'
import Login from './Login.jsx'
import MainPage from './MainPage.jsx'
import QA from './QA.jsx'
import SnakeAndLadder from './SnakeAndLadder.jsx'
import LangSelect from './LangSelect.jsx'
import Alphabets from './Alphabets.jsx'
import AboutUs from './AboutUs.jsx'
import Instruction from './Instruction.jsx'
import Content from './Content.jsx'
import Congratulation from './Congratulation.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Login' element={<Login/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/MainPage' element={<MainPage/>}/>
        <Route path="/MainPage/snake-and-ladder" element={<SnakeAndLadder />} />
        <Route path="/QA" element={<QA />} />
        <Route path="/LangSelect" element={<LangSelect />} />
        <Route path = "/MainPage/Alphabets" element={<Alphabets />}/>
        <Route path= "/MainPage/AboutUs" element= {<AboutUs/>}/>
        <Route path="/Instruction" element={<Instruction />} />
        <Route path="/Content" element={<Content />} />
        <Route path="/Congratulation" element={<Congratulation />} />
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
