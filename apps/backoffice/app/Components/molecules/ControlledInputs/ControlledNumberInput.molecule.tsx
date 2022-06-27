import React, { useState } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
import { NumberFormatProps } from 'react-number-format';
import NumberInput from '../Inputs/NumberInput.molecule';

type ControlledNumberInputProps<T> = NumberFormatProps & {
    title: string;
    name: Path<T>;
    control: Control<T, any>;
    placeholder: string;
};

const ControlledNumberInput = <T,>({
    title,
    name,
    control,
    ...rest
}: ControlledNumberInputProps<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <NumberInput
                    {...rest}
                    {...field}
                    name={name as unknown as never}
                    value={field.value as unknown as never}
                    title={title}
                    errorMessage={error}
                />
            )}
        />
    );
};

export default ControlledNumberInput;
