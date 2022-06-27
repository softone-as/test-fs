import React, { useState } from 'react';
import { HeaderGroup } from 'react-table';

type TableHeadProps = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    headerGroups: HeaderGroup<object>[];
};

const TableHead: React.FC<TableHeadProps> = ({ headerGroups }) => {
    return (
        <thead>
            {headerGroups?.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th
                            {...column.getHeaderProps({
                                style: {
                                    minWidth: column.minWidth,
                                    width: column.width,
                                },
                                ...column.getSortByToggleProps(),
                            })}
                        >
                            {column.render('Header')}
                            <span>
                                {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                    : ''}
                            </span>
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    );
};

export default TableHead;
