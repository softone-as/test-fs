
import React from 'react';

import { Table, Pagination, Space } from 'antd';
import type { TableProps } from 'antd/es/table';
import type { PaginationProps } from 'antd/es/pagination'

interface IProps<T> extends TableProps<T> {
    total: number
    defaultPageSize: number
    defaultCurrent?: number
    onPageChange: (page: number) => void
}


// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(props: IProps<T>): JSX.Element {

    const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
        props.onPageChange(page)

    }
    return (
        <Space direction='vertical' style={{ width: '100%', background: 'white' }}>
            <Table<T> {...props} style={{ width: '100%', background: 'white' }}

                pagination={false}

            />
            <div style={{ display: 'flex', justifyContent: 'end', padding: '8px' }}>
                <Pagination
                    total={props.total}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    defaultPageSize={props.defaultPageSize}
                    defaultCurrent={props.defaultCurrent || 1}
                    onChange={handlePageChange}
                />
            </div>
        </Space>
    )
}


export default DataTable;
