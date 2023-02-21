import React from 'react';
import {
    CheckboxDropdown,
    IPropsCheckboxDropdown,
} from '../../../molecules/Dropdowns/CheckboxDropdown';

export type StrictCheckboxDropdown = Pick<
    IPropsCheckboxDropdown,
    'value' | 'onChange' | 'options' | 'label'
>;

const FilterCheckboxDropdown = (props: StrictCheckboxDropdown) => {
    const { value, onChange, options, label } = props;

    return (
        <CheckboxDropdown
            value={value}
            onChange={onChange}
            options={options}
            label={label}
        />
    );
};

export default FilterCheckboxDropdown;
