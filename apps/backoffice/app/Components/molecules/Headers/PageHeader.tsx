import { Col, Row, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

interface IProps {
    title: string;
    topActions?: React.ReactNode[];
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <Row style={{ marginBottom: '16px' }}>
            <Col flex="auto">
                <Title
                    style={{ fontSize: '24px', lineHeight: '32px', margin: 0 }}
                >
                    {props.title}
                </Title>
            </Col>
            <Col>
                <Space>
                    {props.topActions?.map((field, key) => (
                        <React.Fragment key={key}>{field}</React.Fragment>
                    ))}
                </Space>
            </Col>
        </Row>
    );
};
