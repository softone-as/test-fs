import React from 'react'
import { BasicDropdown } from './BasicDropdown'
import { Row, Col, Button, Space, Form, FormProps } from 'antd'


interface IProps extends FormProps {
    forms?: React.ReactNode[]
    gutter?: number
    columnSpan?: number,
    layout?: 'horizontal' | 'vertical' | 'inline'
}

const containerStyle: React.CSSProperties = { backgroundColor: 'white', minWidth: '765px', minHeight: '246px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' };
const containerButtonStyle: React.CSSProperties = { display: 'flex', justifyContent: 'end' };

const MenuContainer: React.FC<IProps> = ({ forms, gutter = 8, columnSpan = 12, layout = "vertical", ...rest }: IProps) => {
    return (
        <Form style={containerStyle} layout={layout} {...rest}>
            <Row gutter={[gutter, gutter]}>
                {forms.map((form, key) => <Col key={key} span={columnSpan}>{form}</Col>)}
            </Row>

            <Form.Item style={containerButtonStyle}>
                <Space size="middle" >
                    <Button>Cancel</Button>
                    <Button type='primary'>Apply</Button>
                </Space>
            </Form.Item>
        </Form >
    )
}

export const MultiFilterDropdown: React.FC<IProps> = (props: IProps) => {
    return (
        <BasicDropdown title='Filter' dropdownRender={() => <MenuContainer {...props} />} />
    )
}
