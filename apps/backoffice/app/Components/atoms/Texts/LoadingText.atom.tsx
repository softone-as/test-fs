import React, { useState } from 'react';

import { LoadingTextTitle } from './LoadingText.atom.styled';

type LoadingTextProps = {
    children?: React.ReactNode;
};

const LoadingText: React.FC<LoadingTextProps> = ({ children }) => {
    return (
        <LoadingTextTitle>Loading...</LoadingTextTitle>
    );
};

export default LoadingText;
