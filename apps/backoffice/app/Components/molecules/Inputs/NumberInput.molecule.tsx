import React, { forwardRef, LegacyRef } from 'react';
import { ControllerRenderProps, FieldError, Path } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

type NumberInputProps<T> = ControllerRenderProps<T, Path<T>> & {
    title: string;
    errorMessage: FieldError;
};

const NumberInput = forwardRef(
    <T,>(
        { title, onChange, value, errorMessage, ...rest }: NumberInputProps<T>,
        ref: LegacyRef<NumberFormat<unknown>>,
    ): JSX.Element => {
        return (
            <InputWrapper title={title} errorMessage={errorMessage?.message}>
                <NumberFormat
                    {...rest}
                    ref={ref}
                    value={value as string}
                    thousandSeparator="."
                    decimalSeparator=","
                    allowNegative={false}
                    className="field__input"
                    onValueChange={(value) => {
                        onChange(value.value);
                    }}
                />
            </InputWrapper>
        );
    },
);

export default NumberInput;
