import React, { useContext } from 'react';
import { Select, SelectProps } from 'antd';
import { FilterContext } from '../Filter';

export type StrictSelectProps = Pick<
    SelectProps,
    'value' | 'onChange' | 'options' | 'defaultValue' | 'placeholder'
> & { width?: number };

const FilterSelect = (props: StrictSelectProps): React.ReactElement => {
    const { isMobile } = useContext(FilterContext);
    const { value, onChange, options, defaultValue, placeholder, width } =
        props;
    return (
        <Select
            value={value}
            onChange={onChange}
            options={options}
            defaultValue={defaultValue}
            placeholder={placeholder}
            allowClear
            style={{ width: isMobile ? '100%' : width ?? '90px' }}
        />
    );
};

export default FilterSelect;
