import React from 'react';
import { Select, SelectProps } from 'antd';

export type StrictSelectProps = Pick<
    SelectProps,
    'value' | 'onChange' | 'options' | 'defaultValue' | 'placeholder'
>;

const FilterSelect = (props: StrictSelectProps) => {
    const { value, onChange, options, defaultValue, placeholder } = props;
    return (
        <Select
            value={value}
            onChange={onChange}
            options={options}
            defaultValue={defaultValue}
            placeholder={placeholder}
            allowClear
            style={{ width: '90px' }}
        />
    );
};

export default FilterSelect;
