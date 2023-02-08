import React, { useState } from 'react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { DatePicker } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker';

export type TRangeValue = [Dayjs | null, Dayjs | null] | null;
export type TDateRangePicker = RangePickerProps & {
    range?: number;
    onChange: (val: TRangeValue) => void;
};

type TRangePreset = {
    label: string;
    value: [Dayjs, Dayjs];
}[]

const defaultPresets: TRangePreset = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
]

export const DateRangePicker = ({ onChange, range, presets, disabledDate, ...rest }: TDateRangePicker) => {
    const [dates, setDates] = useState<TRangeValue>(null);
    const [value, setValue] = useState<TRangeValue>(null);

    const defaultDisabledDate = (current: Dayjs) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > range;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > range;
        return !!tooEarly || !!tooLate;
    };

    const handleChange = (val) => {
        setValue(val)
        onChange(val)
    }

    return (

        <DatePicker.RangePicker value={dates || value}
            disabledDate={disabledDate || defaultDisabledDate}
            onCalendarChange={(val) => setDates(val)}
            onChange={handleChange}
            presets={presets || defaultPresets}
            {...rest}
        />
    )
}