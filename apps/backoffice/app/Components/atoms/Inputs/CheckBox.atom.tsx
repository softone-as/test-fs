import React, { useState } from 'react';

import {
    CheckBoxContainer,
    CheckBoxInput,
    CheckBoxItem,
    CheckBoxTick,
    CheckBoxTitle,
} from './CheckBox.atom.styled';

type CheckBoxProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    title?: string;
};

const CheckBox: React.FC<CheckBoxProps> = React.forwardRef(
    ({ title, ...rest }, ref) => {
        return (
            <CheckBoxContainer>
                <CheckBoxInput
                    className="checkbox__input"
                    type="checkbox"
                    ref={ref as any}
                    {...rest}
                />
                <CheckBoxItem className="checkbox__in">
                    <CheckBoxTick className="checkbox__tick" />
                    {title && <CheckBoxTitle>{title}</CheckBoxTitle>}
                </CheckBoxItem>
            </CheckBoxContainer>
        );
    },
);

export default CheckBox;
