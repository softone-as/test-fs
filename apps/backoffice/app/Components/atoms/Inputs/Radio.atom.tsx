import React, { useState } from 'react';
import {
    RadioContainer,
    RadioContent,
    RadioInput,
    RadioText,
    RadioTick,
} from './Radio.atom.styled';

export type RadioInputOptions = {
    label: string;
    value: any;
};

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    option: RadioInputOptions;
    ref?: React.LegacyRef<HTMLInputElement>;
};

const Radio: React.FC<RadioProps> = ({ option, ref, ...rest }) => {
    return (
        <div>
            <RadioContainer>
                <RadioInput
                    type="radio"
                    value={option.value}
                    ref={ref as any}
                    {...rest}
                />
                <RadioContent className="radio__in">
                    <RadioTick className="radio__tick" />
                    <RadioText className="radio__text">
                        {option.label}
                    </RadioText>
                </RadioContent>
            </RadioContainer>
        </div>
    );
};

export default Radio;
