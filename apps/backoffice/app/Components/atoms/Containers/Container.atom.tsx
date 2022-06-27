import React, { useState } from 'react';

import {
    ContainerContent,
    ContainerContentItem,
} from './Container.atom.styled';

type ContainerProps = {
    children: React.ReactNode;
    showBackground?: boolean;
};

const Container: React.FC<ContainerProps> = ({ children, showBackground }) => {
    return (
        <ContainerContent className="container">
            <ContainerContentItem background={!showBackground && 'white'}>
                {children}
            </ContainerContentItem>
        </ContainerContent>
    );
};

export default Container;
