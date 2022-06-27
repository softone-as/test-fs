import React, { useState } from 'react';
import { PillBoxContainer } from './PillBox.atom.styled';

type PillBoxProps = {
    children: React.ReactNode;
    className?: string;
};

const PillBox: React.FC<PillBoxProps> = ({ children, className }) => {
    return (
        <PillBoxContainer className={className}>{children}</PillBoxContainer>
    );
};

export default PillBox;
