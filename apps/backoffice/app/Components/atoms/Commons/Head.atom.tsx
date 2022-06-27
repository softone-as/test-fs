import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

type HeadProps = {
    title: string;
};

const Head: React.FC<HeadProps> = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
        </Helmet>
    );
};

export default Head;
