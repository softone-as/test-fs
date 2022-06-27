import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';
import {
    Control,
    Controller,
    ControllerRenderProps,
    Path,
} from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from '../Inputs/DatePicker.molecule';

type ControlledDatePickerProps<T> = Omit<
    ReactDatePickerProps,
    'value' | 'onChange'
> & {
    title: string;
    name: Path<T>;
    control: Control<T, any>;
};

const ControlledDatePicker = <T,>({
    title,
    name,
    control,
    ...rest
}: ControlledDatePickerProps<T>): JSX.Element => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    {...field}
                    {...rest}
                    name={name as unknown as never}
                    value={field.value as unknown as never}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    title={title}
                    errorMessage={error}
                />
            )}
        />
    );
};

export default ControlledDatePicker;
