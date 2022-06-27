import React, { useState } from 'react';
import Blank from '../Layouts/Blank';
import '../../public/css/error.css';

const Dashboard = (): JSX.Element => {
    return (<Blank title="Error">
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>Oops, The Page you are looking for can't be found!</h2>
                <br />
                <a href="/">Return To Homepage</a>
            </div>
        </div>
    </Blank>);
};

export default Dashboard;
