import React, { useState } from 'react'
import type { Dayjs } from 'dayjs'
import { DatePicker } from 'antd'

export type TRangeValue = [Dayjs | null, Dayjs | null] | null;
export type TDateRangePicker = {
    range?: number;
    onChange: (val: TRangeValue) => void;
};

export const DateRangePicker = ({ onChange, range = 7 }: TDateRangePicker) => {
    const [dates, setDates] = useState<TRangeValue>(null);
    const [value, setValue] = useState<TRangeValue>(null);

    const disabledDate = (current: Dayjs) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') > range;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') > range;
        return !!tooEarly || !!tooLate;
    };

    const onOpenChange = (open: boolean) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    const handleChange = (val) => {
        setValue(val)
        onChange(val)
    }

    return (

        <DatePicker.RangePicker value={dates || value}
            disabledDate={disabledDate}
            onCalendarChange={(val) => setDates(val)}
            onChange={handleChange}
            onOpenChange={onOpenChange} />
    )
}