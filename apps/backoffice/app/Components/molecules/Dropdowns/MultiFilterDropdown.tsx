import React from 'react'
import { BasicDropdown } from './BasicDropdown'
import { Row, Col, Button, Space } from 'antd'
import { FormSelect } from '../Forms'

type TMenus = {
    menu: React.ReactNode[]
}

interface IProps {
    forms?: React.ReactNode
    gutter?: number
    columnSpan?: number
}

const containerStyle: React.CSSProperties = { backgroundColor: 'white', minWidth: '765px', minHeight: '246px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px' };
const containerButtonStyle: React.CSSProperties = { display: 'flex', justifyContent: 'end' };

const MenuContainer: React.FC = ({ forms, gutter = 8, columnSpan = 12 }: IProps) => {
    return (
        <div style={containerStyle}>
            <Row gutter={gutter}>
                <Col span={columnSpan}><FormSelect placeholder="Status" options={[{ label: 'Done', value: 'done' }, { label: 'Pending', value: 'pending' }]} /></Col>
                <Col span={columnSpan}><FormSelect placeholder="Status" options={[{ label: 'Done', value: 'done' }, { label: 'Pending', value: 'pending' }]} /></Col>
            </Row>

            <div style={containerButtonStyle}>
                <Space size="middle" >
                    <Button>Cancel</Button>
                    <Button type='primary'>Apply</Button>
                </Space>
            </div>
        </div>
    )
}

export const MultiFilterDropdown = () => {
    return (
        <BasicDropdown title='Filter' dropdownRender={() => <MenuContainer />} />
    )
}
