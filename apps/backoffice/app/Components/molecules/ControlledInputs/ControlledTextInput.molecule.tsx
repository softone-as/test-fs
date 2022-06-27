import React, { useState } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import TextInput from '../Inputs/TextInput.molecule';

type ControlledTextInputProps<T> = {
    type?: string;
    placeholder: string;
    title: string;
    disabled?: boolean;
    control: Control<T, any>;
    hidden?: boolean;
    name: Path<T>;
};

const ControlledTextInput = <T,>({
    title,
    type = 'text',
    control,
    disabled = false,
    placeholder,
    name,
    hidden = false
}: ControlledTextInputProps<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextInput
                    {...field}
                    hidden={hidden}
                    title={title}
                    disabled={disabled}
                    type={type}
                    placeholder={placeholder}
                    error={error}
                    value={field.value as unknown as never}
                />
            )}
        />
    );
};

export default ControlledTextInput;
