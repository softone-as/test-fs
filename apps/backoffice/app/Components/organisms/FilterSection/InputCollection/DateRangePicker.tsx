import React from 'react';
import {
    DateRangePicker,
    TDateRangePicker,
} from '../../../molecules/Pickers/DateRangePicker';

export type StrictDateRangePickerProps = Pick<
    TDateRangePicker,
    'value' | 'onChange' | 'defaultValue' | 'range'
>;

const FilterDateRangePicker = (props: StrictDateRangePickerProps) => {
    const { value, onChange, defaultValue, range } = props;
    return (
        <DateRangePicker
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            range={range}
        />
    );
};

export default FilterDateRangePicker;
