
import React from 'react';

import { Table } from 'antd';
import type { TableProps, } from 'antd/es/table';



// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(props: TableProps<T>): JSX.Element {
    return (
        <Table<T> {...props} style={{ width: '100%' }} />
    )
}

// const DataTable<T extends object = any>: React.FC = <T extends object = any>(props: TableProps<T>) => {
//     return <Table<T> {...props} style={{ width: '100%' }} />
// }

export default DataTable;
