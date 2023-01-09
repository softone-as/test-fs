import React from 'react';

import Head from '../../Components/atoms/Commons/Head.atom';
import Sidebar from '../../Components/organisms/Navigation/Sidebar';

export type MainProps = {
    children: React.ReactNode;
    title: string;
};

export const Main: React.FC<MainProps> = ({ children, title }) => {
    return (
        <div>
            {window.location.host !== process.env.STORY_HOST ? <Head title={title} /> : null}
            <div className="page">
                <Sidebar />
                <div className="page__wrapper">
                    <div className="page__center">{children}</div>
                </div>
            </div>
        </div>
    );
};
