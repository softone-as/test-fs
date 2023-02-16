import { BellOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import { Header } from 'antd/es/layout/layout';
import { themeColors } from 'apps/backoffice/app/Utils/theme';
import React from 'react';
import { CompanyLogo } from '../../atoms/Logos';

interface IMainHeaderProps {
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    collapsed: boolean;
}

const MainHeader: React.FC<IMainHeaderProps> = ({
    setCollapsed,
    collapsed,
}) => {
    return (
        <Header
            style={{
                backgroundColor: themeColors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingInline: '24px',
            }}
        >
            <Space size={30}>
                {React.createElement(MenuOutlined, {
                    className: 'trigger',
                    style: {
                        color: 'white',
                    },
                    onClick: () => setCollapsed(!collapsed),
                })}

                <CompanyLogo />
            </Space>

            <Space size={10}>
                <Avatar size="default" icon={<UserOutlined />} />

                <BellOutlined
                    style={{
                        display: 'block',
                        color: 'white',
                        fontSize: '20px',
                    }}
                />
            </Space>
        </Header>
    );
};

export default MainHeader;
