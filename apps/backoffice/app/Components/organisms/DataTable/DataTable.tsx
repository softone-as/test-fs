
import React from 'react';

import { Table, Pagination, Space } from 'antd';
import type { TableProps } from 'antd/es/table';
import type { PaginationProps } from 'antd/es/pagination'
import { SorterResult } from 'antd/es/table/interface';
import { useTableFilter } from '../../../Utils/hooks'

interface IProps<T> extends TableProps<T> {
    total: number
    perPage: number
    defaultCurrent?: number
}

const stylePaginantion: React.CSSProperties = { display: 'flex', justifyContent: 'end', padding: '8px', backgroundColor: 'white' }
const tableLayout: React.CSSProperties = { width: '100%' }

// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(props: IProps<T>): JSX.Element {

    const { setQueryParams } = useTableFilter()

    const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {

        setQueryParams({ page: page, per_page: pageSize })
    }
    return (
        <Space.Compact direction='vertical' style={tableLayout}>
            <Table<T> {...props} style={tableLayout}
                size='small'
                pagination={false}

                onChange={(pagination, filters, sorter: SorterResult<T>) => {
                    if (!sorter.order) {
                        return
                    }
                    return setQueryParams({ sort: sorter.columnKey as string, order: sorter.order === 'ascend' ? 'ASC' : 'DESC' })
                }}
            />


            <div style={stylePaginantion}>
                {
                    props.total && <Pagination
                        total={props?.total}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        defaultCurrent={props?.defaultCurrent || 1}
                        pageSize={props?.perPage}
                        showSizeChanger
                        onChange={handlePageChange}
                    />
                }

            </div>
        </Space.Compact>
    )
}


export default DataTable;
