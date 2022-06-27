import React, { useState } from 'react';
import {
    HeaderTextContainer,
    HeaderTextTitle,
    HeaderTextTitleContainer,
} from './HeaderText.molecule.styled';

type HeaderTextProps = {
    title: string;
};
const HeaderText: React.FC<HeaderTextProps> = ({ title }) => {
    return (
        <HeaderTextContainer>
            <HeaderTextTitleContainer>
                <HeaderTextTitle>{title}</HeaderTextTitle>
            </HeaderTextTitleContainer>
        </HeaderTextContainer>
    );
};

export default HeaderText;
