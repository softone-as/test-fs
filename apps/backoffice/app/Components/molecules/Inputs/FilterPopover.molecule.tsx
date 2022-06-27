import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Popover } from 'react-tiny-popover';
import CheckBox from '../../atoms/Inputs/CheckBox.atom';
import Radio from '../../atoms/Inputs/Radio.atom';

export type FiltersType = {
    title: string;
    items: {
        checked: boolean;
        label: string;
        value: string;
    }[];
};

type FilterPopoverProps = {
    filters: FiltersType[];
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterPopover: React.FC<FilterPopoverProps> = ({
    filters,
    handleFilter,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Popover
            isOpen={isOpen}
            onClickOutside={() => setIsOpen(false)}
            positions={['bottom', 'left', 'right']} // preferred positions by priority
            content={
                <div className="filter__popover__container">
                    {filters.map((filter) => {
                        return (
                            <React.Fragment key={filter.title}>
                                <h2 className="filter__title">
                                    {filter.title}
                                </h2>
                                {filter.items.map((item) => {
                                    return (
                                        <div key={item.label}>
                                            <Radio
                                                option={item}
                                                onChange={handleFilter}
                                                checked={item.checked}
                                            />
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </div>
            }
        >
            <div
                className="filter__trigger__container"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaFilter />
            </div>
        </Popover>
    );
};

export default FilterPopover;
