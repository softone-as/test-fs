import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    CheckboxOptionType,
    Dropdown,
    Space,
    theme,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const { useToken } = theme;

export interface IPropsCheckboxDropdown {
    label?: React.ReactNode;
    options?: CheckboxOptionType[];
    value?: CheckboxValueType[];
    onChange?: (checkedValue: CheckboxValueType[]) => void;
}

interface IPropsCheckboxDropdownRender {
    options?: CheckboxOptionType[];
    value?: CheckboxValueType[];
    onChange?: (checkedValue: CheckboxValueType[]) => void;
}

const CheckboxDropdownRender: React.FC<IPropsCheckboxDropdownRender> = (
    props,
) => {
    const { options, value, onChange } = props;
    const { token } = useToken();

    const contentStyle: React.CSSProperties = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        padding: 8,
    };

    return (
        <div style={contentStyle}>
            <Checkbox.Group value={value} onChange={onChange}>
                <Space direction="vertical">
                    {options?.map((option, index) => (
                        <Checkbox key={index} value={option.value}>
                            {option.label}
                        </Checkbox>
                    ))}
                </Space>
            </Checkbox.Group>
        </div>
    );
};

export const CheckboxDropdown: React.FC<IPropsCheckboxDropdown> = (props) => {
    const { label, options, value, onChange } = props;

    const { token } = useToken();
    const [open, setOpen] = useState(false);

    const labelStyle: React.CSSProperties = {
        color: value?.length ? token.colorText : token.colorTextPlaceholder,
    };

    return (
        <Dropdown
            open={open}
            onOpenChange={setOpen}
            dropdownRender={() => (
                <CheckboxDropdownRender
                    options={options}
                    value={value}
                    onChange={onChange}
                />
            )}
        >
            <Button>
                <Space style={labelStyle}>
                    {label}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};