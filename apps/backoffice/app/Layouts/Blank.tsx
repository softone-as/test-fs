import React, { useState } from 'react';
import Head from '../Components/atoms/Commons/Head.atom';

type BlankProps = {
    children: React.ReactNode;
    title: string;
};

const Blank: React.FC<BlankProps> = ({ children, title }) => {
    return (
        <div>
            <Head title={title} />
            <div className="page">{children}</div>
        </div>
    );
};

export default Blank;
