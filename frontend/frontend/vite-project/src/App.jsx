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
        
        <Route/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
