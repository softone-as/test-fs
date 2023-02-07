import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export interface ISectionHeaderProps {
    // Title of section / subsection
    title: string

    // Actions to be displayed on the right side of the header
    actions?: React.ReactNode

    // Is the header located on the top of the section?
    top?: boolean
}

export const SectionHeader: React.FC<ISectionHeaderProps> = (props: ISectionHeaderProps) => {
    return (
        <Row align='middle' style={{ margin: '0 -24px', marginTop: props.top ? '-24px' : '8px', padding: '16px 24px' }}>
            <Col flex='auto'>
                <Title style={{ fontSize: '16px', lineHeight: '24px', margin: 0 }}>{props.title}</Title>
            </Col>
            <Col>
                {props.actions}
            </Col>
        </Row>
    )
}