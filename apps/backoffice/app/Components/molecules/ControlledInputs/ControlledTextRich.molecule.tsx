import React, { useState } from 'react';
import { Control, Controller, Path } from 'react-hook-form';

import TextRich from '../Inputs/TextRich.molecule';

type ControlledTextRichProps<T> = {
    title: string;
    name: Path<T>;
    control: Control<T, any>;
    placeholder: string;
};

const ControlledTextRich = <T,>({
    title,
    control,
    name,
    ...rest
}: ControlledTextRichProps<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <TextRich
                    {...field}
                    {...rest}
                    name={name as unknown as never}
                    title={title}
                    value={(field.value as string) || ''}
                    errorMessage={error}
                />
            )}
        />
    );
};

export default ControlledTextRich;
