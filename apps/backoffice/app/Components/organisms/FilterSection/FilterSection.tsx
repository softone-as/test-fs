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

export interface IFilterSection {
    filters?: React.ReactNode[];
    selectedRows: React.Key[];
    batchActionMenus: MenuProps['items'];
    onSearch: (value: string) => void;
    searchValue: string;
}

export const FilterSection = (props: IFilterSection) => {
    const [value, setValue] = useState(props.searchValue);

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
                return <Col key={index}>{item}</Col>;
            })}

            {/* Search */}
            <Col flex="auto">
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    allowClear
                />
            </Col>
        </Row>
    );
};
