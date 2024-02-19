import React from 'react';
import { Descriptions, Space, Tag } from 'antd';
import { defaultSizeSpace } from '../../Utils/theme';
import { MainLayout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Common/Enums/Breadcrumb';
import { Section } from '../../Components/molecules/Section';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { DescriptionContainer } from '../../Components/molecules/DescriptionContainer';
import { formatDate } from '../../Utils/utils';
import { TCNotificationDetailProps } from 'apps/backoffice/@contracts/notification/notification-detail.contract';

type TProps = TInertiaProps & TCNotificationDetailProps;

const DetailNotification: React.FC = (props: TProps) => {
    return (
        <MainLayout
            title="Detail Notification"
            breadcrumbs={Breadcrumbs.Notification.DETAIL}
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section>
                    <DescriptionContainer
                        size="small"
                        bordered
                        column={{ md: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="Title">
                            Detail Notification
                        </Descriptions.Item>
                        <Descriptions.Item label="Message">
                            {props.data.message}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At">
                            {formatDate(props.data.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Is Read">
                            {props.data.message ? (
                                <Tag color={'green'}>Read</Tag>
                            ) : (
                                <Tag color={'yellow'}>Unread</Tag>
                            )}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailNotification;
