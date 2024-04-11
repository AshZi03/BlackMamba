import React, { useState, useEffect } from "react";
import './UserPanel.css';

function UserPanel() {
    const [userLevel, setUserLevel] = useState(null);
    const userId = localStorage.getItem('userid');
    const name = localStorage.getItem('name');
    const mail = localStorage.getItem('email');

    useEffect(() => {
        const fetchUserLevel = async () => {
            try {
                const url = 'http://localhost:8081/GetCurrentLevel'; // Replace with your backend endpoint

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userid: userId,
                    }),
                });

                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setUserLevel(data.level[0].user_level); // Assuming the response contains the user level
                } else {
                    console.log('Failed to fetch user level:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user level:', error.message);
            }
        };

        fetchUserLevel();
    }, [userId]); // Call useEffect whenever userId changes

    return (
        <>
            <div className="dashboard">
                <div className="innerdashboard"><img src="./img/shubham.jpg" alt="Loading..." /></div>
                <div className="innerdashbooard2">
                    <h4>Name: {name}</h4>
                    <h4>E-mail: {mail}</h4>
                    <h4>Current Level: {userLevel}</h4> {/* Display the fetched user level here */}
                    <h4>Language:
                        <div className="dropdown">
                            <span>Marathi</span>
                            <div className="dropdown-content">
                                <p>Hindi</p>
                                <p>Marathi </p>
                                <p>German </p>
                                <p>Sanskrit </p> {/* Corrected typo in Sanskrit */}
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
