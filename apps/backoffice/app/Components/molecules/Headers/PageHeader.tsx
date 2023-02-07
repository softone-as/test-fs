import { Breadcrumb, Col, Row, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';

export interface IBreadcrumbItem {
    title: string;
    to?: string;
}
interface IProps {
    title: string;
    topActions?: React.ReactNode;
    breadcrumbs?: IBreadcrumbItem[];
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <Row style={{ marginBottom: '24px' }}>
            <Col flex="auto">
                {props?.breadcrumbs?.length > 0 && (
                    <Breadcrumb style={{ marginBottom: '8px' }}>
                        {props?.breadcrumbs?.map(({ title, to }) => {
                            return !to ? (
                                <Breadcrumb.Item key={title}>
                                    <span
                                        style={{
                                            color: 'rgba(0, 0, 0, 0.88)',
                                        }}
                                    >
                                        {title}
                                    </span>
                                </Breadcrumb.Item>
                            ) : (
                                <Breadcrumb.Item key={title}>
                                    <a href={to}>{title}</a>
                                </Breadcrumb.Item>
                            );
                        })}
                    </Breadcrumb>
                )}

                <Title style={{ fontSize: '24px', lineHeight: '32px' }}>
                    {props.title}
                </Title>
            </Col>
            <Col>
                <Space>{props?.topActions && props.topActions}</Space>
            </Col>
        </Row>
    );
};
