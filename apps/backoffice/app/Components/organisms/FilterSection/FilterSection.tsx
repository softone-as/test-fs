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
    Form,
    FormInstance,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { isMobileScreen } from '../../../Utils/utils';
import Filter, { TFilterItem } from './Filter';

export interface IFilterSection {
    filters?: TFilterItem[];
    onFiltersChange?: (values: Record<string, any>) => void;
    selectedRows?: React.Key[];
    batchActionMenus?: MenuProps['items'];
    onSearch: (value: string) => void;
    searchValue: string;
}

export type InternalHooks = {
    registerWatch: (FC: (store: Record<string, any>) => void) => void;
};
export interface IFilterFormInstance<T = any> extends FormInstance<T> {
    getInternalHooks: (mark: string) => InternalHooks;
}
export const HOOK_MARK = 'RC_FORM_INTERNAL_HOOKS';

export const FilterSection = (props: IFilterSection) => {
    const [value, setValue] = useState(props.searchValue);
    const [form] = Form.useForm();

    useEffect(() => {
        const { registerWatch } = (
            form as IFilterFormInstance
        ).getInternalHooks(HOOK_MARK);

        const cancelRegister = registerWatch((store) =>
            props?.onFiltersChange(store),
        );
        return cancelRegister;
    }, []);

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
            {props.selectedRows?.length > 0 && props.batchActionMenus && (
                <Col>
                    <Space style={{ paddingRight: '8px' }}>
                        <Dropdown.Button
                            menu={{ items: props.batchActionMenus || [] }}
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
            <Filter onChange={props?.onFiltersChange}>
                {props?.filters.map((filter) => (
                    <Filter.Item key={filter.name} {...filter} />
                ))}
            </Filter>

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
