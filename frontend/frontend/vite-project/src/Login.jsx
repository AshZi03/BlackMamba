import { useState } from 'react'
import "./Login.css";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

function handleInputChange(event) {
  const input = event.target;
  const label = input.previousElementSibling;

  if (input.value.trim() !== '') {
    label.style.top = '-20px'; // Adjust top position when input has content
    label.style.fontSize = '12px';
    label.style.color = '#bdb8b8';
  } else {
    label.style.top = '10px'; // Revert to initial top position when input is empty
    label.style.fontSize = '16px';
    label.style.color = '#fff';
  }
}


function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleLoginIn = async () => {

    
        try {
          const url =  'http://localhost:8081/login' ;
    
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             
              email,
              password,
              // Add other necessary fields for registration
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
               if (data.isLoggedIn) {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('email', `${data.email}`)
              localStorage.setItem('name', `${data.name}`)
              localStorage.setItem('userid', `${data.user_id}`)
            if(data.userLang === null || data.userLang == 0)
            {
              localStorage.setItem('Language',`${data.userLang}`);
              const Language = localStorage.getItem('Language');
              console.log(Language);
              navigate('/LangSelect');  
              }
            else{
              localStorage.setItem('Language',`${data.userLang}`);
              const Language = localStorage.getItem('Language');
              console.log(Language);
              navigate('/MainPage');
              
            }
            }
            console.log(` Login  successful`);
          } else {
            // Handle registration or login failure, show an error message or take appropriate action
            
            console.log(`Login failed:`, data.message);
            setHandledErrors(data.message);
          }
        } catch (error) {
          console.error(`Error during login`, error.message);
        }
    };

  return (
    <>
    <TopBar />
    <div className="background-container">
   <div className="login-container">
    <div className="login-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginIn();
        }}
      >
        <div className="user-box">
          <input
            type="email"
            name="email"
            placeholder='Email'
            required="Enter Valid Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            
          />
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            required=""
            placeholder='Password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          
        </div>
        <center>
          <button className="login-btn" type="submit">
            Login
          </button>
        </center>
        <div className="text-center mt-2 logindes">
      Don't have an Account?{' '}
      <NavLink className="SignUp-Link" to={`/SignUp`}>
        Sign up!
      </NavLink>
    </div>
      </form>
    </div>
    </div>
    </div>
  </>
  )
}

export default Login
