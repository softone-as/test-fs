import React from 'react';
import { Select, SelectProps } from 'antd'

export const FormSelect: React.FC<SelectProps> = (props: SelectProps) => {
    return (
        <Select {...props} allowClear onClear={() => alert('Clear')} style={{ width: '100%' }} />

    )
}