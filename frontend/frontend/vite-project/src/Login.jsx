import { useState } from 'react'
import "./Login.css";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';


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
              localStorage.setItem('userid', `${data.user_id}`)
            if(data.userLang === null || data.userLang == 0)
            {
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
  
  <TopBar/>
   <div className="row g-0 vh-100  justify-content-center align-items-center login-container">
    <div className="col-10  row g-0 align-items-center justify-content-center border rounded-3 bg-white login-panel">
      <form  className="col-12 col-md-6 py-4 px-3"
       onSubmit={(e) => {
        e.preventDefault();
        handleLoginIn();
      }}>
        <h4 className="login-title text-center py-2 mb-4">Login</h4>
        <div className="form-floating mb-3">
        </div>
        <div className="form-floating mb-3">
        <input 
          type="email"
          className="form-control"
          id="email"
          placeholder="xyz@gmail.com"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
        <input 
          type="password"
          className="form-control"
          id="password"
          placeholder="password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <label htmlFor="password">Password</label>
        </div>
        <div className="text-center">
          <button className="login-btn" type='submit'>
            Login
          </button>
        </div>
        <div className="text-center mt-2" >
          Don't have an Account? <NavLink className="SignUp-Link" to={`/SignUp`}> Sign up!</NavLink>
        </div>
      </form>
    </div>
   </div>

  </>
  )
}

export default Login
