import React, { forwardRef, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';
import { Input } from './TextInput.molecule.styled';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error: FieldError;
    title: string;
};

const TextInput: React.FC<TextInputProps> = forwardRef(
    (
        {
            type = 'text',
            placeholder,
            error,
            disabled,
            title,
            name,
            value,
            hidden,
            onChange,
            onBlur,
            ...rest
        }: TextInputProps,
        ref: LegacyRef<HTMLInputElement>,
    ) => (
        <InputWrapper
            title={title}
            errorMessage={error?.message}>
            <Input
                {...rest}
                hidden={hidden}
                disabled={disabled}
                className="field__input"
                type={type}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                name={name}
                onBlur={onBlur}
                ref={ref as any}
            />
        </InputWrapper>
    ),
);

export default TextInput;
