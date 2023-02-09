import React, { useEffect, useState } from 'react';
import {
    Col,
    Row,
    Input,
    MenuProps,
    Typography,
    Space,
    Dropdown,
    Divider,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobileScreen } from '../../../Utils/utils';

export interface IFilterSection {
    filters?: React.ReactNode[];
    selectedRows: React.Key[];
    batchActionMenus: MenuProps['items'];
    onSearch: (value: string) => void;
    searchValue: string;
}

export const FilterSection = (props: IFilterSection) => {
    const [value, setValue] = useState(props.searchValue);

    const isMobile = isMobileScreen();

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.onSearch(value);
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [value]);

    return (
        <Row gutter={[8, 0]} align="middle">
            {/* Batch Action */}
            {props.selectedRows.length > 0 && (
                <Col>
                    <Space style={{ paddingRight: '8px' }}>
                        <Dropdown.Button
                            menu={{ items: props.batchActionMenus }}
                            placement="bottom"
                        >
                            Action
                        </Dropdown.Button>
                        <Typography.Text style={{ color: '#006D75' }}>
                            {props.selectedRows.length} item selected
                        </Typography.Text>
                    </Space>
                    <Divider type="vertical" style={{ padding: '14px 0px' }} />
                </Col>
            )}

            {/* Filters */}
            {props.filters?.map((item, index) => {
                return (
                    <Col
                        key={index}
                        style={{ margin: isMobile ? '5px 0' : '2px' }}
                    >
                        {item}
                    </Col>
                );
            })}

            {/* Search */}
            <Col flex="auto">
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    allowClear
                    style={{ margin: isMobile ? '5px 0' : '2px' }}
                />
            </Col>
        </Row>
    );
};
