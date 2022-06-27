import React, { useState } from 'react';
import { Control, Controller, Path, UseFormGetValues } from 'react-hook-form';

import RadioInput, { RadioInputOptions } from '../Inputs/RadioInput.molecule';

type ControlledRadioInputProps<T> = {
    title?: string;
    getValues: UseFormGetValues<T>;
    name: Path<T>;
    control: Control<T, any>;
    options: RadioInputOptions[];
};

const ControlledRadioInput = <T,>({
    control,
    name,
    title,
    options,
    getValues,
}: ControlledRadioInputProps<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <RadioInput
                    {...field}
                    getValues={getValues as UseFormGetValues<unknown>}
                    error={error}
                    title={title}
                    options={options}
                    value={field.value as unknown as never}
                />
            )}
        />
    );
};

export default ControlledRadioInput;
