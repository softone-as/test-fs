import React, { useEffect, useState } from 'react';
import { Space, Tooltip, Button, Dropdown } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { iconActionTableStyle } from '../../../Utils/theme';

type ButtonType = 'view' | 'edit' | 'delete' | 'custom';

interface IRowActionButtonsProps {
    type?: ButtonType;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    title?: string;
    disabled?: boolean;
}

interface IRowActionProps {
    actions: IRowActionButtonsProps[];
}

export const RowActionButtons: React.FC<IRowActionProps> = ({ actions }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleWindowResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    const renderButton = (action: IRowActionButtonsProps) => {
        const { type, href, onClick, title, disabled } = action;
        let { icon } = action;

        if (!icon) {
            switch (type) {
                case 'view':
                    icon = <EyeOutlined style={iconActionTableStyle} />;
                    break;
                case 'edit':
                    icon = <EditOutlined style={iconActionTableStyle} />;
                    break;
                case 'delete':
                    icon = <DeleteOutlined style={iconActionTableStyle} />;
                    break;
                default:
                    break;
            }
        }

        return (
            <Tooltip title={title} key={title}>
                <Button
                    type="text"
                    shape="circle"
                    href={href}
                    onClick={onClick}
                    icon={icon}
                    disabled={disabled}
                />
            </Tooltip>
        );
    };

    return isMobile ? (
        <Dropdown
            overlayStyle={{ position: "revert-layer", top: "10px" }}
            trigger={['click']}
            overlay={
                <Space direction="vertical">
                    <Space wrap>
                        {actions.slice(0, 3).map(action => renderButton(action))}
                    </Space>
                </Space>
            }
            placement="bottomLeft"
        >
            <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
    ) : (
        <Space direction="vertical">
            <Space wrap>{actions.map(action => renderButton(action))}</Space>
        </Space>
    )
};