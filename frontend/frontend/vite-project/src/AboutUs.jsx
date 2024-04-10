import React from 'react';
import './AboutUs.css';

const Card = ({ name, photo ,insta,git}) => {
  return (
    <div className="card">
      <div className="img d-none d-md-block" style={{ backgroundImage: `url(${photo})` }}></div>
      <span>{name}</span>
      <p className="info">I’m {name}, {insta}.</p>
      <div className="share">
        <a  href= {git} target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
          {/* GitHub SVG path */}
        </svg></a>
        
      </div>
      
    </div>
  );
}

const App = () => {
  const cardsData = [
    { name: 'Ashraf', photo: './img/Ashraf4.jpg', insta : "I'm a front-end React developer! I specialize in creating user-friendly interfaces and engaging web experiences. Let's build something amazing together!",git : 'https://github.com/AshZi03/' },
    { name: 'Atharva', photo: '/img/atharva2.jpeg',insta : "I'm Backend Node.js developer specializing in building robust server-side applications and APIs. I bring data to life, ensuring seamless interactions for your platform. Let's collaborate on scalable solutions!",git : 'https://github.com/atharvajadhav123/' },
    { name: 'Shubham', photo: '/img/shubham.jpg',insta : " I'm a database writer dedicated to organizing data for efficiency and reliability. Whether it's crafting complex queries or optimizing performance. Let's streamline your information for seamless operations",git : 'https://github.com/AshZi03/' },
  ];

  return (
    <div className="app">
      {cardsData.map((data, index) => (
        <Card key={index} name={data.name} photo={data.photo} insta={data.insta} git = {data.git} />
      ))}
    </div>
  );
}

export default App;
