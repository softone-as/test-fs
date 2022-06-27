import React, { useState } from 'react';

import Head from '../Components/atoms/Commons/Head.atom';
import Sidebar from '../Components/organisms/Navigation/Sidebar';

type MainProps = {
    children: React.ReactNode;
    title: string;
};

const Main: React.FC<MainProps> = ({ children, title }) => {
    return (
        <div>
            <Head title={title} />
            <div className="page">
                <Sidebar />
                <div className="page__wrapper">
                    <div className="page__center">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Main;
