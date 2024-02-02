import React, { useRef, useState } from 'react';
import { Table, Pagination, Space, PaginationProps, theme } from 'antd';
import {
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
    TablePaginationConfig,
} from 'antd/es/table/interface';
import {
    IDataTableProps,
    TOnSort,
    FilterState,
    DataTableSorter,
} from './Entities';
import { FilterSection } from '../FilterSection';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { TMeta } from '../../../Modules/Inertia/Entities';

const stylePagination: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'end',
    padding: '8px',
};
const tableLayout: React.CSSProperties = { width: '100%' };

// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(
    props: IDataTableProps<T, Record<string, any>>,
): JSX.Element {
    const {
        pagination,
        defaultCurrent,
        rowSelection,
        batchActionMenus,
        filterComponents,
        onChange,
        search,
        ...rest
    } = props;

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [state, setState] = useState<FilterState<T, Record<string, any>>>({
        custom: {
            search,
        },
    });
    const stateRef = useRef<FilterState<T, Record<string, any>>>(state);
    const { token } = theme.useToken();

    const handleSetState = (
        value: FilterState<T, Record<string, any>>,
    ): void => {
        setState(value);
        stateRef.current = value;
    };

    const handleOnChange = (value: FilterState<T, any>): void => {
        handleSetState(value);
        onChange?.(
            value.custom,
            value.sorter as DataTableSorter<T>,
            value.filters,
            value.pagination,
            value.extra,
        );
    };

    const handleSelectRow = (newSelectedRowKeys: React.Key[]): void => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
        const newState: FilterState<T, Record<string, any>> = {
            ...stateRef.current,
            pagination: {
                ...(stateRef.current.pagination || {}),
                page,
                per_page: pageSize,
            },
            extra: {
                action: 'paginate',
                customContext: filterComponents,
            },
        };
        handleOnChange(newState);
    };

    const handleSearch = (search: string): void => {
        const newState: FilterState<T, Record<string, any>> = {
            ...stateRef.current,
            pagination: { ...(stateRef.current.pagination || {}), page: 1 },
            custom: {
                ...(stateRef.current.custom || {}),
                search,
            },
            extra: {
                action: 'custom',
                customContext: filterComponents,
            },
        };

        handleOnChange(newState);
    };

    const handleFiltersChange = (customFilters: Record<string, any>): void => {
        const newState: FilterState<T, Record<string, any>> = {
            ...stateRef.current,
            custom: { ...(stateRef.current.custom || {}), ...customFilters },
            extra: {
                action: 'custom',

                customContext: filterComponents,
            },
        };
        handleOnChange(newState);
    };

    const handleTableChange = (
        filters: Record<string, FilterValue | null>,
        sorter: TOnSort<T>,
        extra: TableCurrentDataSource<T>,
    ): void => {
        const newState: FilterState<T, Record<string, any> | null> = {
            ...stateRef.current,
            filters: {
                ...(stateRef.current.filters || {}),
                ...filters,
            },
            sorter: {
                ...(stateRef.current.sorter || {}),
                field: sorter.field,
                column: sorter.column,
                sort: String(sorter.columnKey),
                order: sorter.order,
            },
            extra: {
                ...extra,
                customContext: filterComponents,
            },
        };
        handleOnChange(newState);
    };

    return (
        <>
            <FilterSection
                searchValue={state.custom?.search}
                onSearch={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus?.map((menu) => ({
                    ...menu,
                    onClick: (info): void => {
                        menu = menu as MenuItemType;
                        menu.onClick?.(info, selectedRowKeys);
                    },
                    key: 'actionMenu',
                }))}
                filters={filterComponents}
                onFiltersChange={handleFiltersChange}
            />
            <Space.Compact direction="vertical" style={tableLayout}>
                <Table<T>
                    rowSelection={{
                        onChange: handleSelectRow,
                        ...rowSelection,
                    }}
                    {...rest}
                    style={tableLayout}
                    size="small"
                    pagination={false}
                    onChange={(
                        _pagination,
                        filters,
                        sorter: SorterResult<T>,
                        extra,
                    ): void => {
                        const newSorter: TOnSort<T> = {
                            ...sorter,
                            order:
                                sorter.order !== undefined
                                    ? sorter.order === 'ascend'
                                        ? 'ASC'
                                        : 'DESC'
                                    : undefined,
                        };

                        handleTableChange(filters, newSorter, extra);
                    }}
                />

                {pagination && !!pagination?.total && (
                    <div
                        style={{
                            ...stylePagination,
                            backgroundColor: token.colorBgContainer,
                        }}
                    >
                        <Pagination
                            showTotal={(total, range): string =>
                                `${range[0]}-${range[1]} of ${total} items`
                            }
                            defaultCurrent={defaultCurrent || 1}
                            showSizeChanger
                            {...pagination}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </Space.Compact>
        </>
    );
}

export const paginationTransform = (
    meta: TMeta | null,
): TablePaginationConfig => {
    return {
        current: meta?.page,
        total: meta?.total,
        pageSize: meta?.perPage,
    };
};

export default DataTable;
