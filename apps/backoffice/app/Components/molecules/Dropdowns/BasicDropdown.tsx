import React from 'react'
import { Dropdown, Button, Space, DropdownProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'

export interface IBasicDropdown extends DropdownProps {
    title: string;
};

export const BasicDropdown = ({ title, ...rest }: IBasicDropdown) => {
    return (
        <Dropdown {...rest}>
            <Button>
                <Space>
                    {title}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    )
}