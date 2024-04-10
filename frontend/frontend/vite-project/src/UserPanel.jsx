import React from "react";
import './UserPanel.css';

function UserPanel(){
    const name = localStorage.getItem('name');
    console.log(name);
    const mail = localStorage.getItem('email');
    console.log(name);
    return(
    <>
    <div className="dashboard">
        <div className="innerdashboard"><img src="./img/shubham.jpg" alt="Loading..."/></div>
        <div className="innerdashbooard2"><h4>Name: {name}</h4>
        <h4>E-mail: {mail}</h4>
        <h4>Current Level:  </h4>
        <h4>Language: 
            <div class="dropdown">
            <span>Marathi</span>
                <div class="dropdown-content">
                    <p>Hindi</p>
                    <p>Marathi </p>
                    <p>German </p>
                    <p>Sasnkrit </p>
                    <p>Japanese</p>
                </div>
             </div>
         </h4>
        </div>
    </div>
    </>
    );
}

export default UserPanel;
