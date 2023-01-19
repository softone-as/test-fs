import type { DatePickerProps, MenuProps } from 'antd';
import type { Dayjs } from 'dayjs';

export type TDropdownFilter = {
    title: string;
    itemsMenu: MenuProps['items'];
};

export type TDatePickerFilter = {
    onChange: DatePickerProps['onChange'];
};

export type RangeValue = [Dayjs | null, Dayjs | null] | null;
export type TDateRangePickerFilter = {
    range?: number;
    onChange: (val: RangeValue) => void;
};

export type TFilter = {
    type: 'dropdown' | 'datePicker' | 'dateRange';
    dropDownFilter?: TDropdownFilter;
    datePickerFilter?: TDatePickerFilter;
    dateRangePickerFilter?: TDateRangePickerFilter;
};
