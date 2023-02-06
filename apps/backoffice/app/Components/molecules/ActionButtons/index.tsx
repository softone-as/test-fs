import React from 'react';
import { Space, Tooltip, Button } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { iconActionTableStyle } from '../../../Utils/theme';

type ButtonType = 'view' | 'edit' | 'delete' | 'custom';

interface ActionButtonProps {
    type?: ButtonType;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    title?: string;
    disabled?: boolean;
}

interface RowActionButtonsProps {
    actions: ActionButtonProps[];
}

const RowActionButtons: React.FC<RowActionButtonsProps> = ({ actions }) => {
    const renderButton = (action: ActionButtonProps) => {
        let { type, href, onClick, icon, title, disabled } = action;

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

    return (
        <Space direction="vertical">
            <Space wrap>
                {actions.map((action) => renderButton(action))}
            </Space>
        </Space>
    );
};

export default RowActionButtons;