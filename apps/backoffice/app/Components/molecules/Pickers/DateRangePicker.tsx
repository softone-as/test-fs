import React from 'react'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { DatePicker } from 'antd'
import type { RangePickerProps, } from 'antd/es/date-picker';

export type TRangeValue = [Dayjs | null, Dayjs | null] | null;

export type TDateRangePicker = Omit<RangePickerProps, 'presets'> & {
    range?: number;
    onChange: (val: TRangeValue) => void
    presets?: RangePickerProps['presets'] | false
};

const defaultPresets: RangePickerProps['presets'] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
]

export const DateRangePicker = ({ onChange, range = 7, presets, disabledDate, value, ...rest }: TDateRangePicker) => {
    const defaultDisabledDate = (current: Dayjs) => {
        if (!value) {
            return false;
        }
        const tooLate = value[0] && current.diff(value[0], 'days') > range;
        const tooEarly = value[1] && value[1].diff(current, 'days') > range;
        return !!tooEarly || !!tooLate;
    };

    const handleChange = (val) => {
        onChange(val)
    }

    const rangePickerPreset = presets === false ? [] : presets || defaultPresets

    return (

        <DatePicker.RangePicker
            {...rest}
            value={value}
            disabledDate={disabledDate || defaultDisabledDate}
            onChange={handleChange}
            picker={rest.picker}
            // behaviour preset props
            // if props false = there is no preset at all
            // if props not set / undefined = use default preset
            // if props array = use preset from props
            presets={rangePickerPreset}
        />
    )
}