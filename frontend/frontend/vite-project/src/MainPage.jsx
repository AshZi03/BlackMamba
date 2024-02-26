import React, { useState } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Sidebar from './SideBar';
import Content from './Content';
import TopBar from './TopBar'; // Assuming you have a TopBar component
import Home from './Home';
import SnakeAndLadder from './SnakeAndLadder';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userid');
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  
  const Logout = async () => {
    
    try {
      const response = await fetch('http://localhost:8081/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials for cross-origin requests
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('userid');
        navigate('/Login');

        // Logout successful, perform any additional actions (e.g., redirect)
        console.log('Logout successful');
      } else {
        // Logout failed, handle the error
        console.error('Error during logout:', data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };


  return (
    <Container fluid style={{ border: '1px solid #ddd', minHeight: '100vh' }}>
      <Row style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
        <Col md={12}>
          <TopBar />
        </Col>
      </Row>
      <Row style={{ padding: '10px' }}>
        {/* Sidebar with responsive classes */}
        <Col md={3} className="d-none d-md-block" style={{ borderRight:'1px solid #ddd'}}>
          <Sidebar onOptionClick={handleOptionClick} />
        </Col>
        {/* Dropdown for smaller screens */}
        <Col  xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: '10px' }}>
          <Dropdown className="d-md-none">
            <Dropdown.Toggle variant="success" id="dropdown-basic" >
              Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleOptionClick('Home')}>
                Home
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionClick('Alphabets')}>
                Alphabets
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionClick('Setting')}>
                Setting
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptionClick('About us')}>
                About us
              </Dropdown.Item>
              {/* Add more items as needed */}
            </Dropdown.Menu>
          </Dropdown>

          {/* Conditionally render Content based on the selected option */}
          {selectedOption === 'Home' ? (
            <SnakeAndLadder />
          ) : selectedOption === 'Alphabets' ? (
            <div>Hello on AlphaBets</div>
          ) : selectedOption === 'Setting' ? (
            <div>In Setting</div>
          ) : selectedOption === 'About us' ? (
            <div>This is About us</div>
          ) : selectedOption=== 'Log Out' ?(
            Logout
          ):
          (
            <div>Enter A New Journey</div>
          )
        }
        </Col>
        <Col md={3} style={{ padding: '0px', borderLeft: '1px solid #ddd' }}>
          {/* Empty Third Column */}
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
