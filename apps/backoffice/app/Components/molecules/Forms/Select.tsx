import React from 'react';
import { Select, SelectProps, Form, FormItemProps } from 'antd'


interface IProps extends SelectProps {
    label?: string
    name?: string
    formItemProps?: Omit<FormItemProps, 'label' | 'name'>
}

export const FormSelect: React.FC<IProps> = ({ label, name, formItemProps, ...rest }: IProps) => {
    if (label) {
        return (
            <Form.Item label={label} name={name ? name : label} {...formItemProps}>
                <Select {...rest} allowClear style={{ width: '100%' }} />
            </Form.Item>
        )
    }
    return (
        <Select {...rest} allowClear style={{ width: '100%' }} />

    )
}