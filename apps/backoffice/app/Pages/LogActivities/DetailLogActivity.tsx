import React from 'react';

import { Descriptions, Space } from 'antd';
import { defaultSizeSpace } from '../../Utils/theme';
import { PageHeader } from '../../Components/molecules/Headers';
import { MainLayout } from '../../Layouts/MainLayout';
import { Breadcrumbs } from '../../Enums/Breadcrumb';
import DescriptionContainer from '../../Components/molecules/DescriptionContainer/DescriptionContainer';
import { Section } from '../../Components/molecules/Section';
import { ILogActivity } from 'interface-models/log-activity/log-activity.interface';
import { TInertiaProps } from '../../Modules/Inertia/Entities';

interface IProps extends TInertiaProps {
    data: ILogActivity;
}

const DetailBasicPage: React.FC = (props: IProps) => {
    const { id, user, source, metaData, activity, menu, path } = props.data;

    return (
        <MainLayout breadcrumbItems={Breadcrumbs.LogActivity.DETAIL}>
            <PageHeader title="Detail Log" />

            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section>
                    <DescriptionContainer size="small" bordered>
                        <Descriptions.Item label="ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Full Name">
                            {user?.fullname || '-'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Source">
                            {source}
                        </Descriptions.Item>
                        <Descriptions.Item label="Activity">
                            {activity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Menu">
                            {menu}
                        </Descriptions.Item>
                        <Descriptions.Item label="Path">
                            {path}
                        </Descriptions.Item>
                        <Descriptions.Item label="Meta Data">
                            {/* TODO: Interface metaData belum ditentukan */}
                            {JSON.stringify(metaData)}
                        </Descriptions.Item>
                    </DescriptionContainer>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default DetailBasicPage;
