import React, { useState } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Sidebar from './SideBar';
import Content from './Content';
import NavBar from './Navbar'; // Assuming you have a TopBar component
import SnakeAndLadder from './SnakeAndLadder';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Alphabets from './Alphabets';
import AboutUs from './AboutUs';
import './MainPage.css';
import Instruction from './Instruction.jsx';

const MainPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [option1, setOption1] = useState(0);
  const [option2, setOption2] = useState(0);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    console.log('Option clicked:', option);
    if (option === 'Log Out') {
      // Perform logout actions
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      localStorage.removeItem('userid');
      navigate('/Login');
    }
    else{
      setSelectedOption(option);
    }
  };

  return (
    <Container className='cont' fluid style={{ border: '1px solid #ddd', minHeight: '100vh' }}>
      <Row style={{ borderBottom: '1px solid ', padding: '10px' }}>
        <Col md={12}>
          <NavBar />
        </Col>
      </Row>
      <Row style={{ padding: '10px' }}>
        {/* Sidebar with responsive classes */}
        <Col md={3} className="d-none d-md-block" style={{ borderRight: '1px solid #ddd' }}>
          <Sidebar onOptionClick={handleOptionClick} />
        </Col>
        {/* Dropdown for smaller screens */}
        <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: '10px' }}>
          <Dropdown className="d-md-none">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
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
              <Dropdown.Item onClick={() => handleOptionClick('Log Out')}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Conditionally render Content based on the selected option */}
          {selectedOption === 'Home'?(
            <SnakeAndLadder loader1Progress={option1} loader2Progress={option2} setOption1={setOption1} setOption2={setOption2} />
          ): selectedOption  === 'Alphabets' ?(
            <Alphabets/>
          ):selectedOption === 'Setting' ?(
            <div>In Setting</div>
          ):selectedOption === 'About us' ?(
            <AboutUs/>
          ): selectedOption === 'Log Out'? (
            <div>Logging Out...</div>
          ):(
             <Instruction/>
          )

          }
          
        </Col>
        <Col md={3} style={{ padding: '0px', borderLeft: '1px solid #ddd' }}>
          {/* Empty Third Column */}
          <Content loader1Progress={option1} loader2Progress={option2} />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
