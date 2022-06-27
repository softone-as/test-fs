import { IPaginationMeta } from 'apps/backoffice/src/common/interface/index.interface';
import React, { useState } from 'react';
import { useTable, Column, useRowSelect, useSortBy } from 'react-table';
import Pagination from '../../molecules/Navigations/Pagination.molecule';
import FilterTable, {
    FilterTableProps,
} from '../../molecules/DataTable/FilterTable.molecule';
import IndeterminateCheckbox from '../../molecules/DataTable/IndeterminateCheckbox.molecule';
import TableBody from '../../molecules/DataTable/TableBody.molecule';
import TableHead from '../../molecules/DataTable/TableHead.molecule';
import EmptyText from '../../atoms/Texts/EmptyText.atom';
import Container from '../../atoms/Containers/Container.atom';
import LoadingText from '../../atoms/Texts/LoadingText.atom';

type DataTableProps<T extends Record<string, unknown>> = {
    columns: ReadonlyArray<Column<T>>;
    tableContents: readonly T[];
    meta?: IPaginationMeta;
    filter?: FilterTableProps;
    isDisableTable?: boolean;
    isShowCheckbox?: boolean;
    hideFilter?: boolean;
    hidePagination?: boolean;
    setFilters?: React.Dispatch<
        React.SetStateAction<{
            search: string;
            sort: string;
            order: string;
        }>
    >;
    setDisableTable?: React.Dispatch<React.SetStateAction<boolean>>;
    manualSortBy?: boolean;
};

const DataTable = <T extends Record<string, unknown>>({
    columns,
    tableContents,
    isDisableTable = false,
    meta,
    filter,
    isShowCheckbox = false,
    hideFilter = false,
    hidePagination = false,
    manualSortBy = false,
    setFilters,
    setDisableTable
}: DataTableProps<T>): JSX.Element => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state: { sortBy },
        prepareRow,
        selectedFlatRows,
    } = useTable(
        {
            // eslint-disable-next-line @typescript-eslint/ban-types
            columns: columns as readonly Column<object>[],
            data: tableContents,
            initialState: { pageIndex: 1 },
            manualSortBy,
        },
        useSortBy,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    width: 25,
                    minWidth: 25,
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            {isShowCheckbox && (
                                <IndeterminateCheckbox
                                    {...getToggleAllRowsSelectedProps()}
                                    title={undefined}
                                />
                            )}
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            {isShowCheckbox && (
                                <IndeterminateCheckbox
                                    {...row.getToggleRowSelectedProps()}
                                    title={undefined}
                                />
                            )}
                        </div>
                    ),
                },
                ...columns,
            ]);
        },
    );

    React.useEffect(() => {
        if (manualSortBy) {
            setFilters({
                ...filter.filters,
                sort: sortBy[0]?.id,
                order: sortBy[0]?.desc ? 'ASC' : 'DESC',
            });
        }
    }, [sortBy]);

    return (
        <Container>
            {!hideFilter && (
                <FilterTable {...filter} selectedFlatRows={selectedFlatRows} />
            )}

            {
                !isDisableTable && (
                    <div className="table-responsive">
                        <table className="table table-bordered" {...getTableProps()}>
                            <TableHead headerGroups={headerGroups} />
                            <TableBody
                                rows={rows}
                                prepareRow={prepareRow}
                                getTableBodyProps={getTableBodyProps}
                            />
                        </table>
                    </div>
                )
            }

            {/* set empty state */}
            {isDisableTable && <LoadingText />}

            {rows.length === 0 && <EmptyText />}

            {!hidePagination && rows.length !== 0 && (
                <Pagination setDisableTable={setDisableTable} lastPage={meta.totalPage} currentPage={meta.page} />
            )}
        </Container>
    );
};

export default DataTable;
