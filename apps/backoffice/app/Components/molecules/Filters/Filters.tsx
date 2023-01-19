import React, { useState } from 'react'
import { Space, Input, Dropdown, DatePicker, Button, Row, Col } from 'antd'
import { DownOutlined, SearchOutlined } from '@ant-design/icons'
import { TDropdownFilter, TFilter, TDatePickerFilter, TDateRangePickerFilter, RangeValue } from './Entities'
import type { Dayjs } from 'dayjs'
import { debounce } from 'lodash'



const DatePickerFilter = ({ onChange }: TDatePickerFilter) => {
    return <DatePicker onChange={onChange} />
}

//Date Range Picker Filter
const DateRangePickerFilter = ({ onChange, range = 7 }: TDateRangePickerFilter) => {
    const [dates, setDates] = useState<RangeValue>(null);
    const [value, setValue] = useState<RangeValue>(null);

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




const DropdownFilter = ({ title, itemsMenu }: TDropdownFilter) => {

    return (
        <Dropdown menu={{ items: itemsMenu }}>
            <Button>
                <Space>
                    {title}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    )
}


export interface IProps {
    filters: TFilter[],
    handleSearch: (val: any) => void
}

export const Filters: React.FC<IProps> = ({ filters, handleSearch }: IProps) => {
    const searchHandler = debounce((e) => {
        e.preventDefault()
        handleSearch(e.target.value)
    }, 1500)
    return (
        <Row gutter={[8, 0]}>
            <Col >
                <Space>
                    {
                        filters?.map((filter, key) => {
                            switch (filter.type) {
                                case 'datePicker':
                                    return <DatePickerFilter key={key} onChange={filter.datePickerFilter.onChange} />

                                case 'dateRange':
                                    return <DateRangePickerFilter key={key} onChange={filter.dateRangePickerFilter.onChange} range={filter.dateRangePickerFilter.range} />

                                default:
                                    return <DropdownFilter key={key} itemsMenu={filter.dropDownFilter.itemsMenu} title={filter.dropDownFilter.title} />
                            }
                        })
                    }
                </Space>
            </Col>
            <Col flex='auto'>
                <Input prefix={<SearchOutlined />} placeholder='Search' onChange={searchHandler} />
            </Col>
        </Row>
    )
}

