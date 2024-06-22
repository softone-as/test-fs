import { EditOutlined } from '@ant-design/icons';
import { Tag, Descriptions, Space, Image } from 'antd';
import { TCMovieDetailProps } from 'apps/backoffice/@contracts/cinema/movie/movie-detail.contract';
import React from 'react';
import { Breadcrumbs } from '../../../Common/Enums/Breadcrumb';
import { Route, route } from '../../../Common/Route/Route';
import { Button } from '../../../Components/atoms/Button';
import { Section } from '../../../Components/molecules/Section';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaPage } from '../../../Modules/Common/Entities';
import { defaultSizeSpace } from '../../../Utils/theme';
import dayjs from 'dayjs';
import { FORMAT_DATE_BASE } from '../../../Common/Constants/formatter.constant';
import { formatUrlImage } from '../../../Utils/utils';

const MovieDetailPage: TInertiaPage<TCMovieDetailProps> = (props) => {
    const { data } = props;

    return (
        <MainLayout
            title="Detail Movie"
            breadcrumbs={Breadcrumbs.Movies.DETAIL(props.data.id as number)}
            topActions={
                <Button
                    type="primary"
                    href={route(Route.MovieEdit, { id: props.data.id })}
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
                <Section title="Movie Info">
                    <Descriptions size="small" bordered column={2}>
                        <Descriptions.Item label="Title">
                            {data.title}
                        </Descriptions.Item>
                        <Descriptions.Item label="Overview">
                            {data.overview}
                        </Descriptions.Item>
                        <Descriptions.Item label="Poster">
                            <Image
                                src={formatUrlImage(data.poster, data.isTMDB)}
                                alt="poster-img"
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Play Until">
                            {dayjs(data.playUntil).format(FORMAT_DATE_BASE)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tags">
                            {data.tags.map((tag, index) => (
                                <Tag key={index}>{tag.name}</Tag>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                </Section>
            </Space>
        </MainLayout>
    );
};

export default MovieDetailPage;
