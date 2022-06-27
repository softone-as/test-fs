import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { Row } from 'react-table';
import { Popover } from 'react-tiny-popover';

import SearchInput from '../../atoms/Inputs/SearchInput.atom';
import FilterPopover, { FiltersType } from '../Inputs/FilterPopover.molecule';

import FilterSelectInput, {
    FilterSelectOption,
} from '../Inputs/FilterSelect.molecule';
import {
    FilterTableLeftContainer,
    FilterTableLeftContent,
    FilterTableRightContainer,
    FilterTableRightContent,
} from './FilterTable.molecule.styled';
import MenuButton from './MenuButton.molecule';

type FilterType = {
    sort: string;
    search: string;
};

export type FilterTableProps = {
    handleSort: (opt: FilterSelectOption) => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFilter?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClearSearch: () => void;
    filterOptions: FilterSelectOption[];
    filters: FilterType;
    createHref?: string;
    hideDelete?: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    selectedFlatRows?: Row<object>[];
    filterPopoverOptions?: FiltersType[];
    hideFilterPopover?: boolean;
};

const FilterTable: React.FC<FilterTableProps> = ({
    handleSearch,
    handleSort,
    handleFilter,
    filterOptions,
    filters,
    selectedFlatRows,
    createHref,
    handleClearSearch,
    hideDelete,
    filterPopoverOptions,
    hideFilterPopover = true,
}) => {
    return (
        <div className="row py-4">
            <FilterTableLeftContainer className="col-12 col-md-6">
                <FilterTableLeftContent>
                    <FilterSelectInput
                        placeholder="Urutkan Berdasarkan"
                        options={filterOptions}
                        onChange={handleSort}
                        value={filters?.sort}
                    />

                    {!hideFilterPopover && (
                        <FilterPopover
                            filters={filterPopoverOptions}
                            handleFilter={handleFilter}
                        />
                    )}
                </FilterTableLeftContent>
            </FilterTableLeftContainer>
            <FilterTableRightContainer className="col-12 col-md-6">
                <FilterTableRightContent>
                    <SearchInput
                        onChange={handleSearch}
                        value={filters.search}
                        handleClear={handleClearSearch}
                    />

                    <MenuButton
                        createHref={createHref}
                        selectedRows={selectedFlatRows}
                        hideDelete={hideDelete}
                    />
                </FilterTableRightContent>
            </FilterTableRightContainer>
        </div>
    );
};

export default FilterTable;
