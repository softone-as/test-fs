import React, { forwardRef, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

type TextAreaInputProps = React.HTMLAttributes<HTMLTextAreaElement> & {
    error: FieldError;
    title: string;
};

const TextAreaInput: React.FC<TextAreaInputProps> = forwardRef(
    (
        { placeholder, error, title, ...rest },
        ref: LegacyRef<HTMLTextAreaElement>,
    ) => {
        return (
            <InputWrapper title={title} errorMessage={error?.message}>
                <textarea
                    {...rest}
                    className="field__textarea"
                    placeholder={placeholder}
                    ref={ref}
                />
            </InputWrapper>
        );
    },
);

export default TextAreaInput;
