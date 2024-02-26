import { useState } from 'react'
import "./SignUp.css";
import { NavLink, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';


function SignUp() {
  const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [handledErrors, setHandledErrors] = useState('');

    const handleRegister = async () => {
      // Remove the isLogin condition
  
      try {
        const url = 'http://localhost:8081/register';
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            // Add other necessary fields for registration
          }),
        });
    
        const data = await response.json();
    
        if (data.success) {
          // Registration or login successful, you can redirect or show a success message 
          navigate('/Login');
          console.log('Registration successful');
        } else {
          // Handle registration or login failure, show an error message or take appropriate action
          console.log('Registration failed:', data.message);
          setHandledErrors(data.message);
        }
      } catch (error) {
        console.error('Error during registration:', error.message);
      }
    };
  return (
  <>
  <TopBar/>
   <div className="row g-0 vh-100  justify-content-center align-items-center signup-container">
    <div className="col-10 row g-0 align-items-center justify-content-center border rounded-2 bg-white">
   <div className="d-none d-md-block col-6">
        <img src="/img/login1.webp" 
          alt="Loading..." 
          className='img-fluid'
       />
      </div>
      <form  className="col-12 col-md-6 py-4 px-3" 
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}>
        <h4 className="signup-title text-center py-2 mb-4">Sign up</h4>
        <div className="form-floating mb-3">
        <input 
          type="text"
          className="form-control"
          id="username"
          placeholder="AshZi"
          onChange={(e)=>{setUsername(e.target.value)}}
        />
        <label htmlFor="username">UserName</label>
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
          <button className="signup-btn" type='submit'>
            Sign Up
          </button>
        </div>
        <div className="text-center mt-2" >
          Already have an Account? <NavLink className="Login-link" to={`/Login`}> Log in!</NavLink>
        </div>
      </form>
    </div>
   </div>

  </>
  )
}

export default SignUp
