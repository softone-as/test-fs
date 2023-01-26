import { Col, Row, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

interface IProps {
    title: string
    rightMenu?: React.ReactNode[]
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <Row style={{ marginBottom: '16px' }}>
            <Col flex='auto'>
                <Title style={{ fontSize: '24px', lineHeight: '32px' }}>{props.title}</Title>
            </Col>
            <Col>
                <Space>
                    {props.rightMenu?.map((field) => field)}
                </Space>
            </Col>
        </Row>
    )
}