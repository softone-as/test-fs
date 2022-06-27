import React, { useState } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import TextAreaInput from '../Inputs/TextAreaInput.molecule';

type ControlledTextAreaProps<T> = {
    type?: string;
    placeholder: string;
    title: string;
    control?: Control<T, any>;
    name: Path<T>;
};

const ControlledTextArea = <T,>({
    title,
    name,
    placeholder,
    control,
}: ControlledTextAreaProps<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextAreaInput
                    {...field}
                    error={error}
                    title={title}
                    placeholder={placeholder}
                />
            )}
        />
    );
};

export default ControlledTextArea;
