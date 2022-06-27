/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react';
import { Row, TableBodyPropGetter, TableBodyProps } from 'react-table';

interface ITableBody<T extends {}> {
    rows: Row<T>[];
    prepareRow: (row: Row<T>) => void;
    getTableBodyProps: (
        propGetter?: TableBodyPropGetter<object>,
    ) => TableBodyProps;
}

const TableBody = <T extends {}>({
    prepareRow,
    rows,
    getTableBodyProps,
}: ITableBody<T>): JSX.Element => {
    return (
        <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return (
                                <td
                                    {...cell.getCellProps({
                                        style: {
                                            minWidth: cell.column.minWidth,
                                            width: cell.column.width,
                                        },
                                    })}
                                >
                                    {cell.render('Cell')}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
