import React from 'react';
import dayjs from 'dayjs';

import { DatePicker, DatePickerProps } from 'antd';

export const BasicDatePicker = (props: DatePickerProps): React.ReactElement => {
    // convert from date or Date to DayJS
    const toDayJs = (
        date: string | Date | dayjs.Dayjs | null | undefined,
    ): dayjs.Dayjs | undefined => {
        return (date && dayjs(date)) as dayjs.Dayjs;
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
