import React, { useState } from 'react';
import ErrorMessage from '../Commons/ErrorMessage.atom';
import { InputLabel, InputWrapperContainer } from './InputWrapper.atom.styled';

type InputWrapperProps = {
    title?: string;
    disabled?: boolean;
    errorMessage: string | string[];
    children: React.ReactNode;
};

const InputWrapper: React.FC<InputWrapperProps> = ({
    title,
    children,
    errorMessage,
}) => {
    return (
        <InputWrapperContainer>
            {title && <InputLabel>{title}</InputLabel>}
            <div>
                {children}
                {Array.isArray(errorMessage) ? (
                    errorMessage?.map((err) => <ErrorMessage text={err} />)
                ) : (
                    <ErrorMessage text={errorMessage} />
                )}
            </div>
        </InputWrapperContainer>
    );
};

export default InputWrapper;
