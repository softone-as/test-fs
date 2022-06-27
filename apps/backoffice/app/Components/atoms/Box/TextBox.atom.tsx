import React, { useState } from 'react';
import {
    TextBoxContainer,
    TextBoxContent,
    TextBoxContentContainer,
    TextBoxTitle,
} from './TextBox.atom.styled';

type TextBoxProps = {
    title: string;
    isFull?: boolean;
    content: string | React.ReactNode;
};

const TextBox: React.FC<TextBoxProps> = ({ title, content, isFull = false }) => {
    return (
        <TextBoxContainer className={`col-12 col-md-${isFull ? '12' : '6'}`}>
            <TextBoxTitle>{title}</TextBoxTitle>
            <TextBoxContentContainer>
                <TextBoxContent>{content || '-'}</TextBoxContent>
            </TextBoxContentContainer>
        </TextBoxContainer>
    );
};

export default TextBox;
