import React, { forwardRef, LegacyRef } from 'react';
import { FieldError, UseFormGetValues, Path } from 'react-hook-form';
import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';
import Radio from '../../atoms/Inputs/Radio.atom';

export type RadioInputOptions = {
    label: string;
    value: any;
};

type RadioInputProps<T> = React.InputHTMLAttributes<HTMLInputElement> & {
    error: FieldError;
    title: string;
    getValues: UseFormGetValues<T>;
    options: RadioInputOptions[];
};

const RadioInput = forwardRef(
    <T,>(
        {
            title,
            name,
            onBlur,
            onChange,
            getValues,
            error,
            options,
        }: RadioInputProps<T>,
        ref: LegacyRef<HTMLInputElement>,
    ) => (
        <InputWrapper title={title} errorMessage={error?.message}>
            {options.map((option) => {
                const isChecked = getValues(name as Path<T>) === option.value;
                return (
                    <Radio
                        key={option.value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        checked={isChecked}
                        option={option}
                        ref={ref}
                    />
                );
            })}
        </InputWrapper>
    ),
);

export default RadioInput;
