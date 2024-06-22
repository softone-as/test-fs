import { EditOutlined } from '@ant-design/icons';
import { Descriptions, Space } from 'antd';
import { TCTagDetailProps } from 'apps/backoffice/@contracts/cinema/tag/tag-detail.contract';
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

const TagDetailPage: TInertiaPage<TCTagDetailProps> = (props) => {
    const { data } = props;

    return (
        <MainLayout
            title="Detail Tag"
            breadcrumbs={Breadcrumbs.Tags.DETAIL(props.data.id as number)}
            topActions={
                <Button
                    type="primary"
                    href={route(Route.TagEdit, { id: props.data.id })}
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
                <Section title="Tag Info">
                    <Descriptions size="small" bordered column={2}>
                        <Descriptions.Item label="Name">
                            {data.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Movies">
                            {data.movies
                                .map(
                                    (movie) =>
                                        `${movie.title}(${dayjs(
                                            movie.playUntil,
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

export default TagDetailPage;
