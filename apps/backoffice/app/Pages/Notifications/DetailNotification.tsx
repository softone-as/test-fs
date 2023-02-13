import React from 'react';
import { Card, Space } from 'antd';
import { defaultSizeSpace } from '../../Utils/theme';
import { MainLayout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import { Section } from '../../Components/molecules/Section';
import { TInertiaProps } from '../../Modules/Inertia/Entities';
import { IInAppNotification } from 'interface-models/notification/in-app-notification.interface';

interface IProps extends TInertiaProps {
    data: IInAppNotification;
}

const DetailNotification: React.FC = (props: IProps) => {
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
                <Section title="Detail Notification">
                    <Card title={props.data.title}>{props.data.message}</Card>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailNotification;
