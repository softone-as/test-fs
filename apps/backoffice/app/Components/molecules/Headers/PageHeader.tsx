import { Col, Row, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { TBreadcrumbsItem } from 'apps/backoffice/app/Modules/Common/Entities';
import React from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
interface IProps {
    title: string;
    topActions?: React.ReactNode;
    breadcrumbs?: TBreadcrumbsItem[];
}

export const PageHeader: React.FC<IProps> = (props: IProps) => {
    return (
        <Row
            style={{
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Col flex="auto">
                {props?.breadcrumbs?.length > 0 && (
                    <Breadcrumbs breadcrumbs={props.breadcrumbs} />
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
