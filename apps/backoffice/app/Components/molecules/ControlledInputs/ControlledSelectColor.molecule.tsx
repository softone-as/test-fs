import React, { useState } from 'react';
import { Control, Controller, Path, useFieldArray } from 'react-hook-form';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

import { ColourOption } from 'apps/backoffice/app/modules/Color/Entity/color';

import SelectColor from '../Inputs/SelectColor.molecule';

type ControlledSelectColorProps<T> = Omit<StateManagerProps, 'options'> & {
    name: Path<T>;
    title: string;
    options: ColourOption[];
    control: Control<T, any>;
};

const ControlledSelectColor = <T,>({
    title,
    control,
    name,
    options,
    ...rest
}: ControlledSelectColorProps<T>): JSX.Element => {
    const { replace } = useFieldArray({
        control,
        name: name as never,
    });

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => {
                return (
                    <SelectColor
                        {...rest}
                        {...field}
                        name={field.name as unknown as never}
                        value={field.value as unknown as never}
                        title={title}
                        options={options}
                        error={error}
                        replace={replace}
                    />
                );
            }}
        />
    );
};

export default ControlledSelectColor;
