import { EditOutlined } from '@ant-design/icons';
import { Descriptions, Space } from 'antd';
import { TCStudioDetailProps } from 'apps/backoffice/@contracts/cinema/studio/studio-detail.contract';
import dayjs from 'dayjs';
import React from 'react';
import { FORMAT_DATE_BASE } from '../../../Common/Constants/formatter.constant';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { Route, route } from '../../../Common/Route/Route';
import { Button } from '../../../Components/atoms/Button';
import { Section } from '../../../Components/molecules/Section';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaPage } from '../../../Modules/Common/Entities';
import { defaultSizeSpace } from '../../../Utils/theme';

const StudioDetailPage: TInertiaPage<TCStudioDetailProps> = (props) => {
    const { data } = props;

    return (
        <MainLayout
            title="Detail Studio"
            breadcrumbs={Breadcrumbs.Studios.DETAIL(props.data.id as number)}
            topActions={
                <Button
                    type="primary"
                    href={route(Route.StudioEdit, { id: props.data.id })}
                    icon={<EditOutlined />}
                >
                    Edit
                </Button>
            }
        >
            <Space
                direction="vertical"
                size={defaultSizeSpace}
                style={{ width: '100%' }}
            >
                <Section title="Studio Info">
                    <Descriptions size="small" bordered column={2}>
                        <Descriptions.Item label="Studio Number">
                            {data.studioNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Movies Schedule">
                            {data.movieSchedules
                                .map(
                                    (movieSchedule) =>
                                        `${movieSchedule.movie?.title}(${dayjs(
                                            movieSchedule.date,
                                        ).format(FORMAT_DATE_BASE)})`,
                                )
                                .join(', ')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created at">
                            {dayjs(data.createdAt).format(FORMAT_DATE_BASE)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated at">
                            {dayjs(data.updatedAt).format(FORMAT_DATE_BASE)}
                        </Descriptions.Item>
                    </Descriptions>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default StudioDetailPage;
