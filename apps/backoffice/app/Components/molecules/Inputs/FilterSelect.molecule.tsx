import React, { useState } from 'react';

export type FilterSelectOption = {
    label: string;
    value: string;
};

type FilterSelectInputProps = {
    placeholder: string;
    value: string;
    onChange: (option: FilterSelectOption) => void;
    options: FilterSelectOption[];
};

const FilterSelectInput: React.FC<FilterSelectInputProps> = ({
    options,
    onChange,
    value,
    placeholder,
}) => {
    const [active, setActive] = useState(false);

    const handleSelectOption = (option: FilterSelectOption) => {
        onChange(option);
    };

    return (
        <div
            className={`dropdown js-dropdown${active && ' active'}`}
            onClick={() => setActive(!active)}
        >
            <div className="dropdown__head js-dropdown-head">
                {options?.find((option) => option.value === value)?.label ||
                    placeholder}
            </div>
            <div className="dropdown__body js-dropdown-body">
                {options?.map((option) => (
                    <a
                        key={option.label}
                        className="dropdown__item"
                        href="#"
                        onClick={() => handleSelectOption(option)}
                    >
                        <div className="dropdown__title title">
                            {option.label}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default FilterSelectInput;
