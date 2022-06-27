import React, { forwardRef, LegacyRef } from 'react';
import ReactDatePicker, {
    ReactDatePickerProps,
    registerLocale,
} from 'react-datepicker';
import { ControllerRenderProps, FieldError, Path } from 'react-hook-form';
import id from 'date-fns/locale/id'; // the locale you want

import InputWrapper from '../../atoms/Inputs/InputWrapper.atom';

registerLocale('id', id); // register it with the name you want

type DatePickerProps<T> = Omit<ReactDatePickerProps, 'value' | 'onChange'> &
    ControllerRenderProps<T, Path<T>> & {
        title: string;
        errorMessage: FieldError;
    };

const DatePicker = forwardRef(
    <T,>(
        { title, errorMessage, ...rest }: DatePickerProps<T>,
        ref: LegacyRef<ReactDatePicker<never, undefined>>,
    ): JSX.Element => {
        const value = rest.value
            ? new Date(rest.value as unknown as string)
            : undefined;
        return (
            <InputWrapper title={title} errorMessage={errorMessage?.message}>
                <ReactDatePicker
                    {...rest}
                    value={value as unknown as string}
                    dateFormat="dd MMMM yyyy"
                    locale="id"
                    className="field__input field__calendar"
                    ref={ref}
                    selected={value}
                    onChange={(date) => {
                        rest.onChange(date);
                    }}
                />
            </InputWrapper>
        );
    },
);

export default DatePicker;
