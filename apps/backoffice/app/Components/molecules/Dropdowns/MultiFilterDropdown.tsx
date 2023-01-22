import React from 'react'
import { BasicDropdown } from './BasicDropdown'
import { Row, Col } from 'antd'

type TMenus = {
    menu: React.ReactNode[]
}

interface IProps {
    forms: React.ReactNode
}

const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

const MenuContainer: React.FC = () => {
    return (
        <Row gutter={16} style={{ backgroundColor: 'white', minWidth: '765px', minHeight: '246px' }}>
            <Col span={6}><div style={style}>col-6</div></Col>
            <Col span={6}><div style={style}>col-6</div></Col>
            <Col span={6}><div style={style}>col-6</div></Col>
            <Col span={6}><div style={style}>col-6</div></Col>
            <Col span={6}><div style={style}>col-6</div></Col>
            <Col span={6}><div style={style}>col-6</div></Col>
        </Row>
    )
}

export const MultiFilterDropdown = () => {
    return (
        <BasicDropdown title='Filter' dropdownRender={() => <MenuContainer />} />
    )
}
