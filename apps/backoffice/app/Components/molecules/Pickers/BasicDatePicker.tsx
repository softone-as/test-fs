import React from 'react';
import dayjs from 'dayjs'

import { DatePicker, DatePickerProps } from 'antd'

export const BasicDatePicker = (props: DatePickerProps) => {
    return <DatePicker {...props} presets={[
        { label: 'Yesterday', value: dayjs().add(-1, 'd') },
        { label: 'Last Week', value: dayjs().add(-7, 'd') },
        { label: 'Last Month', value: dayjs().add(-1, 'month') },
    ]} />
}