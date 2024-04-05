// SignUp.js
import { useState } from 'react';
import "./Login.css";  // Use the same CSS file as Login.css
import { NavLink, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [handledErrors, setHandledErrors] = useState('');

  const handleRegister = async () => {
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
        navigate('/Login');  // Redirect to Login page on successful registration
        console.log('Registration successful');
      } else {
        console.log('Registration failed:', data.message);
        setHandledErrors(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
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
                handleRegister();
              }}
            >
              <div className="user-box">
                <input
                  type="text"  // Change the type to "text" for username
                  name="username"
                  required="Enter username"
                  placeholder='username'
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="user-box">
                <input
                  type="email"
                  name="email"
                  placeholder='Email'
                  required="Enter valid Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="user-box">
                <input
                  type="password"
                  name="password"
                  placeholder='password'
                  required="Enter Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <center>
                <button className="login-btn" type="submit">
                  Sign Up
                </button>
              </center>
              <div className="text-center mt-2 logindes">
                Already have an Account?{' '}
                <NavLink className="SignUp-Link" to={`/Login`}>
                  Log in!
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
