import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

interface IProps {
    title: string
    actions?: React.ReactNode
}

export const SectionHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <Row align='middle' style={{ marginTop: '24px' }}>
            <Col flex='auto'>
                <Title style={{ fontSize: '16px', lineHeight: '24px', margin: 0 }}>{props.title}</Title>
            </Col>
            <Col>
                {props.actions}
            </Col>
        </Row>
    )
}