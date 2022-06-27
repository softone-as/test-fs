import React, { useState } from 'react';
import {
    ColorBoxContainer,
    ColorBoxContent,
    ColorBoxText,
} from './ColorBox.atom.styled';

type ColorBoxProps = {
    colorHex: string;
    hideName?: boolean;
};

const ColorBox: React.FC<ColorBoxProps> = ({ colorHex, hideName = false }) => {
    return (
        <ColorBoxContainer>
            <ColorBoxContent backgroundColor={colorHex} />
            {!hideName && <ColorBoxText>{colorHex}</ColorBoxText>}
        </ColorBoxContainer>
    );
};

export default ColorBox;
