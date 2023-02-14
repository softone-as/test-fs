import React, { useState } from 'react';

import { Table, Pagination, Space, PaginationProps } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { IDataTableProps, TOnSort, FilterState } from './Entities';
import { FilterSection } from '../FilterSection';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';

const stylePaginantion: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'end',
    padding: '8px',
    backgroundColor: 'white',
};
const tableLayout: React.CSSProperties = { width: '100%' };

// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(
    props: IDataTableProps<T>,
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
    const [state, setState] = useState<FilterState<T>>({
        search,
    });

    const handleSelectRow = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
        setState({ ...state, page, per_page: pageSize });
        onChange({ ...state, page, per_page: pageSize });
    };

    const handleSearch = (value) => {
        setState({ ...state, page: 1, search: value });
        onChange({ ...state, page: 1, search: value });
    };

    const handleFiltersChange = (values: Record<string, any>) => {
        setState({ ...state, ...values });
        onChange({ ...state, ...values });
    };

    const handleTableChange = (
        filters: Record<string, FilterValue>,
        sorter: TOnSort<T>,
    ) => {
        setState({
            ...state,
            ...filters,
            field: sorter.field,
            column: sorter.column,
            sort: String(sorter.columnKey),
            order: sorter.order,
        });
        onChange({
            ...state,
            ...filters,
            field: sorter.field,
            column: sorter.column,
            sort: String(sorter.columnKey),
            order: sorter.order,
        });
    };

    return (
        <>
            <FilterSection
                searchValue={state.search}
                onSearch={handleSearch}
                selectedRows={selectedRowKeys}
                batchActionMenus={batchActionMenus?.map((menu) => ({
                    ...menu,
                    onClick: (info) => {
                        menu = menu as MenuItemType;
                        menu.onClick(info, selectedRowKeys);
                    },
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
                        pagination,
                        filters,
                        sorter: SorterResult<T>,
                    ): void =>
                        handleTableChange(filters, {
                            ...sorter,
                            order:
                                sorter.order !== undefined
                                    ? sorter.order === 'ascend'
                                        ? 'ASC'
                                        : 'DESC'
                                    : undefined,
                        })
                    }
                />

                <div style={stylePaginantion}>
                    {pagination && !!pagination?.total && (
                        <Pagination
                            showTotal={(total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`
                            }
                            defaultCurrent={defaultCurrent || 1}
                            showSizeChanger
                            {...pagination}
                            onChange={handlePageChange}
                        />
                    )}
                </div>
            </Space.Compact>
        </>
    );
}

export default DataTable;
