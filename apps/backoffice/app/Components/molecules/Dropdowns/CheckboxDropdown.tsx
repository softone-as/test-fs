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
    defaultValue?: CheckboxValueType[];
    placeholder?: React.ReactNode;
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
    const { placeholder, options, value, onChange, defaultValue } = props;

    const [state, setState] = useState<CheckboxValueType[]>(
        value || defaultValue || [],
    );
    const handleOnChange = (value: CheckboxValueType[]) => {
        setState(value);
        onChange(value);
    };

    const { token } = useToken();
    const [open, setOpen] = useState(false);

    const labelStyle: React.CSSProperties = {
        color: state?.length ? token.colorText : token.colorTextPlaceholder,
    };

    return (
        <Dropdown
            open={open}
            onOpenChange={setOpen}
            dropdownRender={() => (
                <CheckboxDropdownRender
                    options={options}
                    value={state}
                    onChange={handleOnChange}
                />
            )}
        >
            <Button>
                <Space style={labelStyle}>
                    {placeholder}
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
};
