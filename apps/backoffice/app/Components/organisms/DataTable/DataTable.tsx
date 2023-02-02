
import React from 'react';

import { Table, Pagination, Space } from 'antd';
import type { TableProps } from 'antd/es/table';
import type { PaginationProps } from 'antd/es/pagination'
import { SorterResult } from 'antd/es/table/interface';

interface IProps<T> extends TableProps<T> {
    total: number
    perPage: number
    defaultCurrent?: number
    onSort?: (sorter: SorterResult<T>) => void
    onPageChange: (page: number, pageSize: number) => void
}

const stylePaginantion: React.CSSProperties = { display: 'flex', justifyContent: 'end', padding: '8px', backgroundColor: 'white' }
const tableLayout: React.CSSProperties = { width: '100%' }

// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(props: IProps<T>): JSX.Element {

    const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
        props.onPageChange(page, pageSize)
    }
    return (
        <Space.Compact direction='vertical' style={tableLayout}>
            <Table<T> {...props} style={tableLayout}
                size='small'
                pagination={false}

                onChange={(pagination, filters, sorter: SorterResult<T>) => props.onSort(sorter)}
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
