import React, { useState } from 'react';
import {
    TextGroupContainer,
    TextGroupTitle,
} from './TextBoxGroup.molecule.styled';

type TextBoxGroupType = {
    children: React.ReactNode;
    title: string;
    padding?: string;
};

const TextBoxGroup: React.FC<TextBoxGroupType> = ({
    children,
    title,
    padding,
}) => {
    return (
        <TextGroupContainer
            className="row align-items-start gy-2"
            padding={padding}
        >
            <div className="col-12 mb-2">
                <TextGroupTitle>{title}</TextGroupTitle>
            </div>
            {children}
        </TextGroupContainer>
    );
};

export default TextBoxGroup;
