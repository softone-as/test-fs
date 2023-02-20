import React, { useContext } from 'react';
import {
    DateRangePicker,
    TDateRangePicker,
} from '../../../molecules/Pickers/DateRangePicker';
import { FilterContext } from '../Filter';
import { Dayjs } from 'dayjs';

type TValue = {
    [K: string]: Dayjs;
};

interface IDateRangePicker
    extends Omit<TDateRangePicker, 'value' | 'onChange'> {
    value?: TValue | [Dayjs, Dayjs];
    onChange?: (val: TValue) => void;
    valueProps?: [string, string];
}

export type StrictDateRangePickerProps = Pick<
    IDateRangePicker,
    'value' | 'onChange' | 'defaultValue' | 'range' | 'valueProps'
>;

const FilterDateRangePicker = (props: StrictDateRangePickerProps) => {
    const { isMobile } = useContext(FilterContext);
    const {
        value,
        onChange,
        defaultValue,
        range,
        valueProps = ['start_at', 'end_at'],
    } = props;
    return (
        <DateRangePicker
            value={
                Array.isArray(value)
                    ? value
                    : value && [value.start_at, value.end_at]
            }
            onChange={(values) => {
                onChange(
                    values && {
                        [valueProps[0]]: values[0].toISOString(),
                        [valueProps[1]]: values[1].toISOString(),
                    },
                );
            }}
            defaultValue={defaultValue}
            range={range}
            style={{ width: isMobile && '100%' }}
        />
    );
};

export default FilterDateRangePicker;
