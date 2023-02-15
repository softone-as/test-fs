import type { TableProps } from 'antd/es/table';
import { ColumnType, SorterResult } from 'antd/es/table/interface';

import React from 'react';
import {
    MenuDividerType,
    MenuItemGroupType,
    MenuItemType,
    SubMenuType,
} from 'antd/es/menu/hooks/useItems';

export type TOrder = {
    order: 'ASC' | 'DESC' | undefined;
};

export type TOnSort<T> = Omit<SorterResult<T>, 'order'> & TOrder;

/* Custom types component Dropdown ant design for supporting passing selectedRowKeys from component DataTable */
export declare type MenuClickEventHandler = (
    info: MenuInfo,
    selectedRowKeys?: React.Key[],
) => void;

export type MenuInfo = {
    key: string;
    keyPath: string[];
    /** @deprecated This will not support in future. You should avoid to use this */
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
};

export interface IMenuItemType extends Omit<MenuItemType, 'onClick'> {
    onClick?: MenuClickEventHandler;
}
export interface ISubMenuType extends Omit<SubMenuType, 'onClick'> {
    onClick?: MenuClickEventHandler;
}
export type ItemType =
    | IMenuItemType
    | ISubMenuType
    | MenuItemGroupType
    | MenuDividerType
    | null;

export type FilterState<T> = {
    [key: string]: any;
    search?: string;
    column?: ColumnType<T>;
    order?: 'DESC' | 'ASC' | null;
    field?: React.Key | readonly React.Key[];
    sort?: string;
    total?: number;
    page?: number;
    per_page?: number;
};

export interface IDataTableProps<T> extends Omit<TableProps<T>, 'onChange'> {
    defaultCurrent?: number;
    batchActionMenus?: ItemType[];
    filterComponents?: {
        name: string;
        component: React.ReactNode;
    }[];
    search?: string;
    onChange?: (filters: FilterState<T>) => void;
}
