// Content.js

import React from 'react';
import './Content.css';

const Content = ({ loader1Progress, loader2Progress }) => {
    return (
        <>
            <h5 className='colorlevel'> Complete one level</h5>
            <div className="loaderBar" style={{ width: `${loader1Progress * 20}%` }}></div>
            <h5 className='colorlevel'> Complete Three Level </h5>
            <div className="loaderBar" style={{ width: `${loader2Progress * 20}%` }}></div>
        </>
    );
};

export default Content;
