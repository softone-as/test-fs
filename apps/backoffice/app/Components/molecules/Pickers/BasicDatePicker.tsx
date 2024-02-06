import React from 'react';
import dayjs from 'dayjs';

import { DatePicker, DatePickerProps } from 'antd';

export const BasicDatePicker = (props: DatePickerProps): React.ReactElement => {
    // convert from date or Date to DayJS
    const toDayJs = (
        date: string | Date | dayjs.Dayjs | null | undefined,
    ): dayjs.Dayjs | undefined => {
        if (date === null || date === undefined) return dayjs();
        return dayjs(date);
    };

    return (
        <DatePicker
            {...props}
            value={toDayJs(props.value)}
            defaultValue={toDayJs(props.defaultValue)}
            defaultPickerValue={toDayJs(props.defaultPickerValue)}
            presets={[
                { label: 'Yesterday', value: dayjs().add(-1, 'd') },
                { label: 'Last Week', value: dayjs().add(-7, 'd') },
                { label: 'Last Month', value: dayjs().add(-1, 'month') },
            ]}
        />
    );
};
