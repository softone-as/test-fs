import type { TableProps } from 'antd/es/table';
import { SorterResult } from 'antd/es/table/interface';
import { TMeta } from '../../../Modules/Inertia/Entities';

export type TOrder = {
    order: 'ASC' | 'DESC' | undefined;
};

export type TOnSort<T> = Omit<SorterResult<T>, 'order'> & TOrder;

export interface IProps<T> extends TableProps<T> {
    meta: TMeta;
    defaultCurrent?: number;
    onSort?: (sorter: TOnSort<T>) => void;
    onPageChange: (page: number, pageSize: number) => void;
}
