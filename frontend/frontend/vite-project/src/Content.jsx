// Content.js

import React from 'react';
import './Content.css';

const Content = ({ loader1Progress, loader2Progress }) => {
    return (
        <>
            <h5> Todays Task</h5>
            <div className="loaderBar" style={{ width: `${loader1Progress * 20}%` }}></div>
            <h5> Todays Task</h5>
            <div className="loaderBar" style={{ width: `${loader2Progress * 20}%` }}></div>
        </>
    );
};

export default Content;
