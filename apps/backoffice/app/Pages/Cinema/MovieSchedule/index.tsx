import React from 'react';

import { PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TCMovieScheduleIndexProps } from 'apps/backoffice/@contracts/cinema/movie-schedule/movie-schedule-index.contract';
import { Button } from 'apps/backoffice/app/Components/atoms/Button';
import {
    deleteBulkMovieSchedule,
    deleteMovieSchedule,
} from 'apps/backoffice/app/Modules/Cinema/MovieSchedule/Action';
import { MovieScheduleIndexRequest } from 'apps/backoffice/src/modules/cinema/requests/movie-schedule/movie-schedule-index.request';
import { IMovieSchedule } from 'interface-models/movie/movie-schedule.interface';
import { Route, route } from '../../../Common/Route/Route';
import { RowActionButtons } from '../../../Components/molecules/RowActionButtons';
import { DataTable, sortOrder } from '../../../Components/organisms/DataTable';
import { paginationTransform } from '../../../Components/organisms/DataTable/DataTable';
import { ItemType } from '../../../Components/organisms/DataTable/Entities';
import { MainLayout } from '../../../Layouts/MainLayout';
import { TInertiaPage } from '../../../Modules/Common/Entities';
import { useTableFilter } from '../../../Utils/hooks';
import { showModal } from '../../../Utils/modal';
import { formatDate, isMobileScreen } from '../../../Utils/utils';

const MovieSchedulesPage: TInertiaPage<TCMovieScheduleIndexProps> = (props) => {
    const {
        implementTableFilter,
        filters,
        status: { isFetching },
    } = useTableFilter<MovieScheduleIndexRequest>();
    const isMobile = isMobileScreen();

    const columns: ColumnsType<IMovieSchedule> = [
        {
            title: 'Studio',
            dataIndex: 'studio',
            key: 'studio',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'studio',
                order: filters.order,
                sort: filters.sort,
            }),
            render: (studio) => studio?.studioNumber,
        },
        {
            title: 'Movie',
            dataIndex: 'movie',
            key: 'movie',
            sorter: true,
            sortOrder: sortOrder({
                columnKey: 'movie',
                order: filters.order,
                sort: filters.sort,
            }),
            render: (movie) => movie?.title,
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (startTime) => formatDate(startTime, 'HH:mm'),
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (endTime) => formatDate(endTime, 'HH:mm'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => formatDate(date, 'dd MMM yyyy'),
        },
        {
            title: isMobile ? null : 'Action',
            key: 'action',
            width: '142px',
            render: (text, record): React.ReactNode => {
                return (
                    <RowActionButtons
                        actions={[
                            {
                                type: 'view',
                                href: route(Route.MovieScheduleDetail, {
                                    id: record.id,
                                }),
                                title: 'view',
                            },
                            {
                                type: 'edit',
                                href: route(Route.MovieScheduleEdit, {
                                    id: record.id,
                                }),
                                title: 'edit',
                            },
                            {
                                type: 'delete',
                                title: 'delete',
                                onClick: (): void => {
                                    showModal({
                                        title: 'Are You Sure? ',
                                        type: 'confirm',
                                        variant: 'danger',
                                        onOk: () =>
                                            deleteMovieSchedule(
                                                record.id as number,
                                            ),
                                    });
                                },
                            },
                        ]}
                    />
                );
            },
        },
    ];

    const batchActionMenus: ItemType[] = [
        {
            key: '1',
            label: 'Delete',
            onClick: (_, selectedRowKeys) =>
                showModal({
                    title: 'Are You Sure?',
                    type: 'confirm',
                    variant: 'danger',
                    onOk: () =>
                        selectedRowKeys &&
                        deleteBulkMovieSchedule(selectedRowKeys),
                }),
            icon: <ShareAltOutlined />,
            style: { width: '151px' },
        },
    ];

    return (
        <MainLayout
            title="Movie Schedule List"
            topActions={
                <Button
                    icon={<PlusOutlined />}
                    href={Route.MovieScheduleCreate}
                    type="primary"
                >
                    Movie Schedule
                </Button>
            }
        >
            <DataTable
                batchActionMenus={batchActionMenus}
                onChange={implementTableFilter}
                columns={columns}
                dataSource={props.data}
                rowKey="id"
                search={filters.search}
                pagination={paginationTransform(props.meta)}
                loading={isFetching}
                filterComponents={[
                    {
                        label: 'Studio',
                        options: props.studios,
                        type: 'Select',
                        name: 'studioId',
                        width: 150,
                        placeholder: 'Pilih Studio',
                    },
                ]}
            />
        </MainLayout>
    );
};

export default MovieSchedulesPage;
