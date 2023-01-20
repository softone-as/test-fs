import React from 'react'
import { Space, Dropdown, MenuProps, DropdownProps } from 'antd'

export interface IBatchActionDropdown extends DropdownProps {
    title: string;
    itemsMenu: MenuProps['items'];
};

export const BatchActionDropdown = ({ title, itemsMenu, ...rest }: IBatchActionDropdown) => {
    return (
        <Space wrap>
            <Dropdown.Button menu={{ items: itemsMenu }} {...rest}>
                {title}
            </Dropdown.Button>
        </Space>
    )
}