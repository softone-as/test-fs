import React, { useState } from 'react';
import { Control, Controller, Path, useFieldArray } from 'react-hook-form';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

import Select, { SelectOption } from '../Inputs/Select.molecule';

type ControlledSelectProps<T> = Omit<StateManagerProps, 'options' | 'name'> & {
    name: Path<T>;
    title: string;
    options: SelectOption[];
    control: Control<T, any>;
};

const ControlledSelect = <T,>({
    title,
    control,
    name,
    options,
    ...rest
}: ControlledSelectProps<T>): JSX.Element => {
    const { replace } = useFieldArray({
        control,
        name: name as never,
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Select
                    {...rest}
                    {...field}
                    name={name as unknown as never}
                    value={field.value as unknown as never}
                    title={title}
                    options={options}
                    error={error}
                    replace={replace}
                />
            )}
        />
    );
};

export default ControlledSelect;
